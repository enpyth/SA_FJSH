'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserBasicInfo } from './components/UserBasicInfo';
import { ProfileEditForm } from './components/ProfileEditForm';
import { ProfileDisplay } from './components/ProfileDisplay';
import { UserProfile } from './types';
import { Button } from '@mui/material';

// 辅助函数
const createFormData = (email: string, data: Partial<UserProfile>): UserProfile => ({
    email,
    logo: data.logo || '',
    introduction: data.introduction || '',
    role: data.role || '',
    chineseName: data.chineseName || '',
    englishName: data.englishName || '',
    driverLicenseNo: data.driverLicenseNo || '',
    birthplace: data.birthplace || '',
    wechatId: data.wechatId || '',
    birthDate: data.birthDate || '',
    address: data.address || '',
    phoneNumber: data.phoneNumber || '',
    occupation: data.occupation || '',
    companyName: data.companyName || '',
    companyAddress: data.companyAddress || '',
    referrer: data.referrer || ''
});

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
                        setEditForm(createFormData(session.user.email, data));
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
                    setEditForm(createFormData(session?.user?.email || '', updatedProfile.profile));
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
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex items-center justify-between px-4 py-3 bg-white border-b">
                        <h2 className="text-xl font-semibold text-gray-800">个人资料</h2>
                        <div className="flex gap-3">

                            <Button 
                                variant="outlined" 
                                color="error" 
                                size="small"
                                onClick={handleSignOut}
                                sx={{ minWidth: '100px' }}
                            >
                                退出登录
                            </Button>
                        </div>
                    </div>
                    <UserBasicInfo session={session} profile={profile} />

                    {isEditing ? (
                        <ProfileEditForm
                            editForm={editForm}
                            setEditForm={setEditForm}
                            onSubmit={handleUpdateProfile}
                            onCancel={() => setIsEditing(false)}
                        />
                    ) : (
                        profile?.role !== 'regular' && (
                            <ProfileDisplay
                                profile={profile as UserProfile}
                                onEdit={() => setIsEditing(true)}
                                canEdit={profile?.role !== 'regular'}
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    );
}