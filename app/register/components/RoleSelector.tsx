interface RoleSelectorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  const roles = [
    { value: 'regular', label: '普通会员' },
    { value: 'corporate', label: '企业会员' },
    { value: 'sponsor', label: '赞助商' },
  ];

  return (
    <div className="flex justify-around p-4 border rounded-md">
      {roles.map((role) => (
        <label key={role.value} className="flex items-center">
          <input
            type="radio"
            name="role"
            value={role.value}
            checked={value === role.value}
            onChange={onChange}
            className="mr-2"
          />
          {role.label}
        </label>
      ))}
    </div>
  );
} 