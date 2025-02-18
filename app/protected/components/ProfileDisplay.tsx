import { UserProfile, profileFields } from '../types';
import { Button } from '@mui/material';
interface ProfileDisplayProps {
    profile: UserProfile;
    onEdit: () => void;
    canEdit: boolean;
}

export function ProfileDisplay({ profile, onEdit, canEdit }: ProfileDisplayProps) {
    return (
        <>
            {/* <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">企业简介</h3>
                <p className="text-gray-600 whitespace-pre-wrap">
                    {profile?.introduction || '暂无简介'}
                </p>
            </div> */}

            <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">详细信息</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileFields.map(({ key, label }) => (
                        <div key={key} className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">{label}</span>
                            <span className="mt-1 text-gray-900">
                                {profile?.[key as keyof UserProfile] || '未填写'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {canEdit && (
                <div className="mt-6 flex justify-end">
                <Button variant="outlined" onClick={onEdit} sx={{ minWidth: '100px' }}>
                        编辑资料
                    </Button>
                </div>
            )}
        </>
    );
} 