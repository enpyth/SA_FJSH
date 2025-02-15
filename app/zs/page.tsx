'use client'
// app/page.tsx
import { useState } from 'react';

interface UserForm {
  name: string;
  email: string;
  password: string;
}

interface UpdateProfileForm {
  email: string;
  logo?: string;
  introduction?: string;
}

export default function TestPage() {
  // 注册表单状态
  const [registerForm, setRegisterForm] = useState<UserForm>({
    name: '',
    email: '',
    password: ''
  });

  // 更新档案表单状态
  const [updateForm, setUpdateForm] = useState<UpdateProfileForm>({
    email: '',
    logo: '',
    introduction: ''
  });

  // 添加查询相关状态
  const [queryEmail, setQueryEmail] = useState('');
  const [queryResult, setQueryResult] = useState<{name: string} | null>(null);
  const [querying, setQuerying] = useState(false);

  // 注册用户
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm)
      });

      const data = await response.json();

      if (response.ok) {
        alert('注册成功！');
        setRegisterForm({ name: '', email: '', password: '' });
      } else {
        alert(`注册失败: ${data.error}`);
      }
    } catch (error) {
      alert('注册请求失败');
    }
  };

  // 更新用户档案
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    // 构建更新数据，只包含已填写的字段
    const updateData: UpdateProfileForm = { email: updateForm.email };
    if (updateForm.logo) updateData.logo = updateForm.logo;
    if (updateForm.introduction) updateData.introduction = updateForm.introduction;

    try {
      const response = await fetch('/api/users/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('档案更新成功！');
        setUpdateForm({ email: '', logo: '', introduction: '' });
      } else {
        alert(`更新失败: ${data.error}`);
      }
    } catch (error) {
      alert('更新请求失败');
    }
  };

  // 查询用户姓名
  const handleQuery = async () => {
    if (!queryEmail) return;
    
    setQuerying(true);
    setQueryResult(null);

    try {
      const response = await fetch(`/api/users/${queryEmail}`);
      const data = await response.json();

      if (response.ok) {
        setQueryResult({ name: data.name });
      } else {
        alert(data.message || '未找到用户');
      }
    } catch (error) {
      alert('查询失败');
    } finally {
      setQuerying(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* 查询区域 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">查询用户</h2>
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="email"
              value={queryEmail}
              onChange={e => setQueryEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="输入邮箱查询用户"
            />
          </div>
          <button
            onClick={handleQuery}
            disabled={querying || !queryEmail}
            className={`px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {querying ? '查询中...' : '查询'}
          </button>
        </div>
        {queryResult && (
          <div className="mt-2 p-3 bg-gray-50 rounded">
            查询结果：{queryResult.name}
          </div>
        )}
      </div>

      {/* 注册表单 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">用户注册</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1">姓名:</label>
            <input
              type="text"
              value={registerForm.name}
              onChange={e => setRegisterForm({...registerForm, name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">邮箱:</label>
            <input
              type="email"
              value={registerForm.email}
              onChange={e => setRegisterForm({...registerForm, email: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">密码:</label>
            <input
              type="password"
              value={registerForm.password}
              onChange={e => setRegisterForm({...registerForm, password: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            注册
          </button>
        </form>
      </div>

      {/* 更新档案表单 */}
      <div>
        <h2 className="text-2xl font-bold mb-4">更新用户档案</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block mb-1">邮箱 (必填):</label>
            <input
              type="email"
              value={updateForm.email}
              onChange={e => setUpdateForm({...updateForm, email: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">头像链接 (选填):</label>
            <input
              type="url"
              value={updateForm.logo}
              onChange={e => setUpdateForm({...updateForm, logo: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
          <div>
            <label className="block mb-1">个人简介 (选填):</label>
            <textarea
              value={updateForm.introduction}
              onChange={e => setUpdateForm({...updateForm, introduction: e.target.value})}
              className="w-full p-2 border rounded"
              rows={4}
              placeholder="请输入您的个人简介..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            更新档案
          </button>
        </form>
      </div>
    </div>
  );
}
