'use client';
import { Card, CardContent, Typography, Box, Container, Stack, Paper, Divider } from '@mui/material';
import { getMeetings } from "@/data/meetings"
import { CalendarToday, AccessTime, Description } from '@mui/icons-material';

export default function BoardMeetings() {
  const { upcomingMeetings, pastMeetings } = getMeetings();

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
                <Card key={meeting.id} elevation={3} sx={{ 
                  height: '100%', 
                  transition: '0.3s', 
                  '&:hover': { transform: 'translateY(-4px)' } 
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                      {meeting.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                      <CalendarToday sx={{ mr: 1, fontSize: 20 }} />
                      <Typography>{meeting.date}</Typography>
                    </Box>
                    {meeting.time && (
                      <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                        <AccessTime sx={{ mr: 1, fontSize: 20 }} />
                        <Typography>{meeting.time}</Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
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
                <Card key={meeting.id} elevation={2} sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                      {meeting.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                      <CalendarToday sx={{ mr: 1, fontSize: 20 }} />
                      <Typography>{meeting.date}</Typography>
                    </Box>
                    {meeting.summary && (
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', color: 'text.secondary' }}>
                        <Description sx={{ mr: 1, mt: 0.5, fontSize: 20 }} />
                        <Typography>{meeting.summary}</Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
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
  )
}

