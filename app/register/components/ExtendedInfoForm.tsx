import { FormField } from './FormField';
import { RegisterForm } from '../types';

interface ExtendedInfoFormProps {
  form: RegisterForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ExtendedInfoForm({ form, onChange }: ExtendedInfoFormProps) {
  const fields = [
    { name: 'chineseName', placeholder: '中文姓名' },
    { name: 'englishName', placeholder: '英文姓名' },
    { name: 'driverLicenseNo', placeholder: '驾照号码' },
    { name: 'birthplace', placeholder: '籍贯' },
    { name: 'wechatId', placeholder: '微信号' },
    { name: 'birthDate', type: 'date' },
    { name: 'address', placeholder: '通讯地址' },
    { name: 'phoneNumber', type: 'tel', placeholder: '联络电话' },
    { name: 'occupation', placeholder: '职业' },
    { name: 'companyName', placeholder: '公司名' },
    { name: 'companyAddress', placeholder: '公司地址' },
    { name: 'referrer', placeholder: '推荐人' },
  ];

  return (
    <>
      {fields.map((field) => (
        <FormField
          key={field.name}
          name={field.name}
          type={field.type}
          value={form[field.name as keyof RegisterForm] || ''}
          onChange={onChange}
          placeholder={field.placeholder}
        />
      ))}
    </>
  );
} 