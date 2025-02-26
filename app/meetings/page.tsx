import { Container, Stack, Box, Typography, Divider } from '@mui/material';
import { getMeetings } from "@/data/meetings";
import { redirect } from 'next/navigation';
import MeetingsList from './components/MeetingsList';
import { auth } from "@/lib/auth";

export default async function BoardMeetings() {
  const session = await auth();
  if (!session) {
    return redirect('/login');
  }
  
  const { upcomingMeetings, pastMeetings } = getMeetings();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={4}>
        {/* Upcoming Meetings Section */}
        <Box>
          <Typography variant="h4" fontWeight="bold" mb={4} color="primary">
            即将举行的会议
          </Typography>
          <MeetingsList
            meetings={upcomingMeetings}
            variant="upcoming"
            emptyMessage="暂无即将举行的会议"
          />
        </Box>

        {/* Past Meetings Section */}
        <Box>
          <Divider sx={{ mb: 6 }} />
          <Typography variant="h4" fontWeight="bold" mb={4} color="primary">
            会议记录
          </Typography>
          <MeetingsList
            meetings={pastMeetings}
            variant="past"
            emptyMessage="暂无历史会议记录"
          />
        </Box>
      </Stack>
    </Container>
  );
}

