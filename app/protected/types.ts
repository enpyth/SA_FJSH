export interface UserProfile {
    email: string;
    logo?: string;
    introduction?: string;
    role?: string;
    chineseName?: string;
    englishName?: string;
    driverLicenseNo?: string;
    birthplace?: string;
    wechatId?: string;
    birthDate?: string;
    address?: string;
    phoneNumber?: string;
    occupation?: string;
    companyName?: string;
    companyAddress?: string;
    referrer?: string;
}

export const profileFields = [
    { key: 'chineseName', label: '中文姓名' },
    { key: 'englishName', label: '英文姓名' },
    { key: 'driverLicenseNo', label: '驾照号码' },
    { key: 'birthplace', label: '籍贯' },
    { key: 'wechatId', label: '微信号' },
    { key: 'birthDate', label: '出生日期' },
    { key: 'address', label: '通讯地址' },
    { key: 'phoneNumber', label: '联络电话' },
    { key: 'occupation', label: '职业' },
    { key: 'companyName', label: '公司名' },
    { key: 'companyAddress', label: '公司地址' },
    { key: 'referrer', label: '推荐人' }
] as const; 