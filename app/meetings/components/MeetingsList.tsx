'use client';

import { Box, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { MeetingCard } from './MeetingCard';
import { Meeting } from '@/types/meeting';

interface MeetingsListProps {
  meetings: Meeting[];
  variant: 'upcoming' | 'past';
  emptyMessage: string;
}

export default function MeetingsList({ meetings, variant, emptyMessage }: MeetingsListProps) {
  const router = useRouter();

  const handleMeetingClick = (meetingId: string) => {
    router.push(`/meetings/${meetingId}`);
  };

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
      gap: 3
    }}>
      {meetings.length > 0 ? (
        meetings.map(meeting => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
            onClick={handleMeetingClick}
            variant={variant}
          />
        ))
      ) : (
        <Paper sx={{ p: 3, bgcolor: 'grey.50', gridColumn: '1 / -1' }}>
          <Typography color="text.secondary" align="center">
            {emptyMessage}
          </Typography>
        </Paper>
      )}
    </Box>
  );
} 