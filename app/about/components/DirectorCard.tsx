import { Card, CardContent, Avatar, Typography, Divider } from '@mui/material';

interface DirectorCardProps {
    director: {
        name: string;
        role: string;
        email: string;
        image: string;
        company?: string;  // 设为可选
        description?: string;  // 设为可选
    };
    variant: 'president' | 'vicePresident' | 'director';
}

export function DirectorCard({ director, variant }: DirectorCardProps) {
    const styles = {
        president: {
            elevation: 3,
            avatarSize: 120,
            padding: 4,
            borderWidth: 3,
            textVariant: 'h5' as const,
        },
        vicePresident: {
            elevation: 2,
            avatarSize: 100,
            padding: 3,
            borderWidth: 2,
            textVariant: 'h6' as const,
        },
        director: {
            elevation: 1,
            avatarSize: 90,
            padding: 3,
            borderWidth: 1,
            textVariant: 'h6' as const,
        },
    }[variant];

    return (
        <Card 
            elevation={styles.elevation}
            sx={{
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)'
                }
            }}
        >
            <CardContent sx={{ 
                textAlign: 'center',
                p: styles.padding
            }}>
                <Avatar
                    src={director.image}
                    alt={director.name}
                    sx={{
                        width: styles.avatarSize,
                        height: styles.avatarSize,
                        mx: 'auto',
                        mb: 3,
                        border: styles.borderWidth,
                        borderColor: 'primary.main'
                    }}
                />
                <Typography 
                    variant={styles.textVariant}
                    gutterBottom 
                    sx={{ fontWeight: 'bold' }}
                >
                    {director.name}
                </Typography>
                <Typography 
                    color="primary" 
                    gutterBottom
                    sx={{ mb: 2 }}
                >
                    {director.role}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography 
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.8 }}
                >
                    {director.email}
                </Typography>
            </CardContent>
        </Card>
    );
} 