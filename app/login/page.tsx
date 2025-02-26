'use client';

import { useState } from 'react';
import Link from 'next/link';
import EmailPasswordForm from './components/EmailPasswordForm';
import GoogleLoginButton from './components/GoogleLoginButton';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            登录账户
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <EmailPasswordForm loading={loading} setLoading={setLoading} />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">或</span>
            </div>
          </div>

          <div>
            <GoogleLoginButton disabled={loading} />
          </div>

          <div className="text-sm text-center">
            <Link
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              还没有账户？立即注册
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
