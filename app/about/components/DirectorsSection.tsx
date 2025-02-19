import { Box, Typography } from '@mui/material';
import { DirectorCard } from './DirectorCard';
import { directors } from '@/data/about';

export function DirectorsSection() {
    return (
        <Box>
            <Typography 
                variant="h3" 
                textAlign="center" 
                mb={6}
                sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                    position: 'relative',
                    '&:after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -2,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '240px',
                        height: '4px',
                        backgroundColor: 'primary.main',
                    }
                }}
            >
                理事会成员
            </Typography>

            {/* 会长部分 */}
            <Box mb={8}>
                <Typography 
                    variant="h4" 
                    textAlign="center" 
                    mb={4}
                    sx={{ color: 'text.primary', fontWeight: 500 }}
                >
                    会长
                </Typography>
                <Box 
                    sx={{ 
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 4,
                        justifyContent: 'center'
                    }}
                >
                    {directors.filter(d => d.role === "会长" || d.role === "执行会长").map((director, index) => (
                        <Box 
                            key={index}
                            sx={{ 
                                flex: {
                                    xs: '1 1 100%',
                                    md: '1 1 calc(50% - 32px)',
                                    lg: '1 1 calc(33.333% - 32px)'
                                },
                                minWidth: 0
                            }}
                        >
                            <DirectorCard director={director} variant="president" />
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* 副会长部分 */}
            <Box mb={8}>
                <Typography 
                    variant="h4" 
                    textAlign="center" 
                    mb={4}
                    sx={{ color: 'text.primary', fontWeight: 500 }}
                >
                    副会长
                </Typography>
                <Box 
                    sx={{ 
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 4
                    }}
                >
                    {directors.filter(d => d.role.includes("副会长")).map((director, index) => (
                        <Box 
                            key={index}
                            sx={{ 
                                flex: {
                                    xs: '1 1 100%',
                                    md: '1 1 calc(50% - 32px)',
                                    lg: '1 1 calc(33.333% - 32px)'
                                },
                                minWidth: 0
                            }}
                        >
                            <DirectorCard director={director} variant="vicePresident" />
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* 其他角色部分 */}
            <Box>
                <Typography 
                    variant="h4" 
                    textAlign="center" 
                    mb={4}
                    sx={{ color: 'text.primary', fontWeight: 500 }}
                >
                    其他角色
                </Typography>
                <Box 
                    sx={{ 
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 3
                    }}
                >
                    {directors
                        .filter(d => !d.role.includes("会长") && d.role !== "admin")
                        .map((director, index) => (
                            <Box 
                                key={index}
                                sx={{ 
                                    flex: {
                                        xs: '1 1 100%',
                                        md: '1 1 calc(50% - 24px)',
                                        lg: '1 1 calc(33.333% - 24px)'
                                    },
                                    minWidth: 0
                                }}
                            >
                                <DirectorCard director={director} variant="director" />
                            </Box>
                        ))}
                </Box>
            </Box>
        </Box>
    );
} 