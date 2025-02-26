import { getMeetings } from "@/data/meetings";
import { promises as fs } from 'fs';
import path from 'path';
import { notFound, redirect } from 'next/navigation';
import { Card, CardContent, Typography, Box, Container, Stack, IconButton, Divider } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { MeetingInfo } from '../components/MeetingInfo';
import { directors } from "@/data/about";
import { auth } from "@/lib/auth";

export default async function MeetingDetail({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const session = await auth();
  if (!session) {
    return redirect('/login');
  }

  // 验证用户是否是理事会成员
  const current_email = session.user?.email;
  const isDirector = directors.some(director => 
    director.email.toLowerCase() === current_email?.toLowerCase()
  );
  
  if (!isDirector) {
    redirect('/meetings');
  }

  const { upcomingMeetings, pastMeetings } = getMeetings();
  const { id } = await params;
  const meeting = [...upcomingMeetings, ...pastMeetings].find(m => m.id === id);

  if (!meeting) {
    notFound();
  }

  let content = '';
  if (meeting.file) {
    const filePath = path.join(process.cwd(), 'data', meeting.file);
    content = await fs.readFile(filePath, 'utf8');
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Link href="/meetings" passHref>
          <IconButton 
            sx={{ 
              bgcolor: 'background.paper',
              boxShadow: 1,
              '&:hover': { bgcolor: 'grey.100' }
            }}
          >
            <ArrowBack />
          </IconButton>
        </Link>
      </Box>

      <Stack spacing={4}>
        <Card 
          elevation={3}
          sx={{
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              fontWeight="bold" 
              color="primary"
              sx={{ mb: 3 }}
            >
              {meeting.title}
            </Typography>
            
            <MeetingInfo
              date={meeting.date}
              time={meeting.time}
              address={meeting.address}
            />

            <Divider sx={{ my: 3 }} />

            <Box sx={{ 
              mt: 4,
              '& .prose': {
                '& h1': { 
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  mb: 2,
                  color: 'text.primary'
                },
                '& h2': {
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  mt: 3,
                  mb: 2,
                  color: 'text.primary'
                },
                '& p': {
                  mb: 2,
                  lineHeight: 1.7,
                  color: 'text.secondary'
                },
                '& ul': {
                  pl: 3,
                  mb: 2,
                  color: 'text.secondary'
                },
                '& li': {
                  mb: 1,
                  lineHeight: 1.6
                }
              }
            }}>
              <div className="prose max-w-none">
                <Markdown>{content}</Markdown>
              </div>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
} 