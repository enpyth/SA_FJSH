export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  role: 'regular' | 'corporate' | 'sponsor';
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