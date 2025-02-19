'use client';
import { Container, Stack, Box, Typography, Paper, Divider } from '@mui/material';
import { getMeetings } from "@/data/meetings";
import { useRouter } from 'next/navigation';
import { MeetingCard } from './components/MeetingCard';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function BoardMeetings() {
  const { upcomingMeetings, pastMeetings } = getMeetings();
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography>加载中...</Typography>
      </Container>
    );
  }

  if (status !== 'authenticated') {
    return null;
  }

  const handleMeetingClick = (meetingId: string) => {
    router.push(`/meetings/${meetingId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={4}>
        {/* Upcoming Meetings Section */}
        <Box>
          <Typography variant="h4" fontWeight="bold" mb={4} color="primary">
            即将举行的会议
          </Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3
          }}>
            {upcomingMeetings.length > 0 ? (
              upcomingMeetings.map(meeting => (
                <MeetingCard
                  key={meeting.id}
                  meeting={meeting}
                  onClick={handleMeetingClick}
                  variant="upcoming"
                />
              ))
            ) : (
              <Paper sx={{ p: 3, bgcolor: 'grey.50', gridColumn: '1 / -1' }}>
                <Typography color="text.secondary" align="center">
                  暂无即将举行的会议
                </Typography>
              </Paper>
            )}
          </Box>
        </Box>

        {/* Past Meetings Section */}
        <Box>
          <Divider sx={{ mb: 6 }} />
          <Typography variant="h4" fontWeight="bold" mb={4} color="primary">
            会议记录
          </Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3
          }}>
            {pastMeetings.length > 0 ? (
              pastMeetings.map(meeting => (
                <MeetingCard
                  key={meeting.id}
                  meeting={meeting}
                  onClick={handleMeetingClick}
                  variant="past"
                />
              ))
            ) : (
              <Paper sx={{ p: 3, bgcolor: 'grey.50', gridColumn: '1 / -1' }}>
                <Typography color="text.secondary" align="center">
                  暂无历史会议记录
                </Typography>
              </Paper>
            )}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}

