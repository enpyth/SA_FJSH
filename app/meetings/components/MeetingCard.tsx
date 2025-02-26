import { Card, CardContent, Typography, Box } from '@mui/material';
import { CalendarToday, AccessTime, Description, LocationOn } from '@mui/icons-material';
import { Meeting } from '@/types/meeting';

interface MeetingCardProps {
    meeting: Meeting;
    onClick: (id: string) => void;
    variant?: 'upcoming' | 'past';
}

export function MeetingCard({ meeting, onClick, variant = 'upcoming' }: MeetingCardProps) {
    const isUpcoming = variant === 'upcoming';

    return (
        <Card
            elevation={isUpcoming ? 3 : 2}
            sx={{
                height: '100%',
                transition: '0.3s',
                '&:hover': { transform: 'translateY(-4px)', cursor: 'pointer' }
            }}
            onClick={() => onClick(meeting.id)}
        >
            <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                    {meeting.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                    <CalendarToday sx={{ mr: 1, fontSize: 20 }} />
                    <Typography>{meeting.date}</Typography>
                    {isUpcoming && meeting.time && (
                        <>
                            <AccessTime sx={{ ml: 2, mr: 1, fontSize: 20 }} />
                            <Typography>{meeting.time}</Typography>
                        </>
                    )}
                </Box>

                {!isUpcoming && meeting.summary && (
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2, color: 'text.secondary' }}>
                        <Description sx={{ mr: 1, mt: 0.5, fontSize: 20 }} />
                        <Typography>{meeting.summary}</Typography>
                    </Box>
                )}

                {meeting.address && (
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                        <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                        <Typography>{meeting.address}</Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
} 