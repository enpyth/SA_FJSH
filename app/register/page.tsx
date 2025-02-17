'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormField } from './components/FormField';
import { RoleSelector } from './components/RoleSelector';
import { ExtendedInfoForm } from './components/ExtendedInfoForm';
import { RegisterForm } from './types';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    role: 'regular'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. 检查用户是否已存在
      const checkResponse = await fetch(`/api/users/${form.email}`);
      if (checkResponse.ok) {
        setError('该邮箱已被注册');
        setLoading(false);
        return;
      }

      // 2. 注册新用户
      const registerResponse = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await registerResponse.json();

      if (registerResponse.ok) {
        // 注册成功，重定向到登录页
        router.push('/login');
      } else {
        setError(data.error || '注册失败');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '注册失败');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          创建新账户
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <RoleSelector value={form.role} onChange={handleChange} />

          <div className="rounded-md shadow-sm space-y-3">
            <FormField
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="昵称"
              required
            />
            <FormField
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="邮箱地址"
              required
              autoComplete="email"
            />
            <FormField
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="密码"
              required
              autoComplete="new-password"
            />

            {(form.role === 'corporate' || form.role === 'sponsor') && (
              <ExtendedInfoForm form={form} onChange={handleChange} />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? '注册中...' : '注册'}
          </button>
        </form>
      </div>
    </div>
  );
}
