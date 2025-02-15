'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
    email: string;
    logo?: string;
    introduction?: string;
}

export default function ProtectedPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<UserProfile>({
        email: '',
        logo: '',
        introduction: ''
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    useEffect(() => {
        const fetchProfile = async () => {
            if (session?.user?.email) {
                try {
                    const response = await fetch(`/api/users/${session.user.email}`);
                    if (response.ok) {
                        const data = await response.json();
                        setProfile(data);
                        setEditForm({
                            email: session.user.email,
                            logo: data.logo || '',
                            introduction: data.introduction || ''
                        });
                    }
                } catch (error) {
                    console.error('Error fetching profile:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        if (session?.user) {
            fetchProfile();
        }
    }, [session]);

    const handleSignOut = async () => {
        await signOut({ redirect: true, callbackUrl: '/login' });
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            });

            if (response.ok) {
                const updatedProfile = await response.json();
                if (updatedProfile.profile) {
                    setProfile(updatedProfile.profile);
                    setEditForm({
                        email: session?.user?.email || '',
                        logo: updatedProfile.profile.logo || '',
                        introduction: updatedProfile.profile.introduction || ''
                    });
                }
                setIsEditing(false);
            } else {
                const errorData = await response.json();
                alert(`更新失败: ${errorData.message || '请重试'}`);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('更新过程中出现错误');
        }
    };

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">加载中...</div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-4 flex justify-end">
                    <button
                        onClick={handleSignOut}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        退出登录
                    </button>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex items-center space-x-6 mb-6">
                        {profile?.logo ? (
                            <img
                                src={profile.logo}
                                alt="Profile"
                                className="h-24 w-24 rounded-full object-cover"
                            />
                        ) : (
                            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-2xl text-gray-500">
                                    {session.user.name?.[0]?.toUpperCase() || '?'}
                                </span>
                            </div>
                        )}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {session.user.name}
                            </h2>
                            <p className="text-gray-600">{session.user.email}</p>
                        </div>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    头像链接
                                </label>
                                <input
                                    type="url"
                                    value={editForm.logo}
                                    onChange={(e) => setEditForm({ ...editForm, logo: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="https://example.com/avatar.jpg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    个人简介
                                </label>
                                <textarea
                                    value={editForm.introduction}
                                    onChange={(e) => setEditForm({ ...editForm, introduction: e.target.value })}
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="请输入您的个人简介..."
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    保存
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">个人简介</h3>
                                <p className="text-gray-600 whitespace-pre-wrap">
                                    {profile?.introduction || '暂无简介'}
                                </p>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    编辑资料
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}