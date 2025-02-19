import Image from 'next/image';
import { Session } from 'next-auth';
import { UserProfile } from '../types';
import { Button, Link, Box, Typography, Tooltip } from '@mui/material';

interface UserBasicInfoProps {
    session: Session;
    profile: UserProfile | null;
}

export function UserBasicInfo({ session, profile }: UserBasicInfoProps) {
    const tooltipContent = (
        <Box sx={{ p: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
                会员年费：$50 AUD
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 1 }}>
                银行账户信息：
            </Typography>
            
            <Typography variant="body2" sx={{ ml: 1, mb: 1 }}>
                Account Name: Australia Fujian Business Council Incorporated<br />
                BSB: 065-005<br />
                Account Number: 107-770-99
            </Typography>
            
            <Typography variant="body2">
                缴纳年度会费并通过审核后成为企业会员
            </Typography>
        </Box>
    );

    return (
        <div className="flex items-center justify-between p-5">
            <div className="flex items-center space-x-6">
                {profile?.logo ? (
                    <Image
                        src={profile.logo}
                        alt={profile.email}
                        width={800}
                        height={300}
                        priority
                        style={{
                            display: 'block',
                            width: '100%',
                            height: '300px',
                            objectFit: 'cover'
                        }}
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
                    <p className="text-gray-600 mt-1">
                        身份：{profile?.role === 'regular' ? '普通会员' :
                            profile?.role?.includes('corporate') ? '企业会员' :
                            profile?.role === 'core' ? '理事' :
                                profile?.role?.includes('sponsor') ? '赞助商' : '未知'}
                    </p>
                </div>
            </div>

            {profile?.role?.includes('checked')? (
                <Link href="/"><Button
                    variant="outlined"
                    size="small"
                    color="success"
                    sx={{ minWidth: '100px' }}
                >
                    审核通过
                </Button></Link>
            ) : profile?.role === 'core'? (
                <Link href="/meetings"><Button
                    variant="outlined"
                    size="small"
                    color="success"
                    sx={{ minWidth: '100px' }}
                >
                    理事会议
                </Button></Link>
            ) : (
                <Tooltip 
                    title={tooltipContent}
                    arrow
                    placement="bottom"
                    sx={{
                        '& .MuiTooltip-tooltip': {
                            bgcolor: 'background.paper',
                            color: 'text.primary',
                            boxShadow: 1,
                            fontSize: '0.875rem',
                            maxWidth: 'none'
                        }
                    }}
                >
                    <Button
                        variant="outlined"
                        size="small"
                        color='inherit'
                        sx={{ minWidth: '100px' }}
                    >
                        审核中
                    </Button>
                </Tooltip>
            )}
        </div>
    );
} 