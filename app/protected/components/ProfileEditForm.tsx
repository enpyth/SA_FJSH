import { UserProfile, profileFields } from '../types';

interface ProfileEditFormProps {
    editForm: UserProfile;
    setEditForm: (form: UserProfile) => void;
    onSubmit: (e: React.FormEvent) => Promise<void>;
    onCancel: () => void;
}

export function ProfileEditForm({ editForm, setEditForm, onSubmit, onCancel }: ProfileEditFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-3">
            {profileFields.map(({ key, label }) => (
                <div key={key} className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                    <input
                        type={key === 'birthDate' ? 'date' : 'text'}
                        value={editForm[key as keyof UserProfile] || ''}
                        onChange={(e) => setEditForm({
                            ...editForm,
                            [key]: e.target.value
                        })}
                        className="mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1.5"
                    />
                </div>
            ))}
            {/* <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    TODO 头像链接
                </label>
                <input
                    type="url"
                    value={editForm.logo}
                    onChange={(e) => setEditForm({ ...editForm, logo: e.target.value })}
                    className="mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1.5"
                    placeholder="https://example.com/avatar.jpg"
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    企业简介
                </label>
                <textarea
                    value={editForm.introduction}
                    onChange={(e) => setEditForm({ ...editForm, introduction: e.target.value })}
                    rows={3}
                    className="mt-0.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="请输入您的企业简介..."
                />
            </div> */}
            <div className="flex justify-end space-x-2 mt-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    取消
                </button>
                <button
                    type="submit"
                    className="px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    保存
                </button>
            </div>
        </form>
    );
} 