'use client'
import { Button, Card, CardContent, CardMedia, LinearProgress, Typography, Container, Box, Grid, Stack } from '@mui/material'
import Link from 'next/link'
import { LocationOn } from '@mui/icons-material'

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  address: string;
  image?: string;
  registeredCount: number;
  maxCapacity: number;
}

export default function EventSection({ events }: { events: Event[] }) {
  return (
    <Box component="section" sx={{ py: 16, bgcolor: 'grey.50' }}>
      <Container>
        <Typography variant="h3" fontWeight="bold" mb={8} textAlign="center">
          商会活动
        </Typography>
        <Grid container spacing={4}>
          {events.length > 0 ? (
            events.map((event) => (
              <Grid item xs={12} md={6} key={event.id}>
                <Card sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  transition: '0.3s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}>
                  <Box sx={{ width: { xs: '100%', md: '33%' } }}>
                    <Link href={`/events/${event.id}`}>
                      <CardMedia
                        component="img"
                        image={event.image || "/placeholder.svg"}
                        alt={event.title}
                        sx={{ height: '100%', minHeight: 200 }}
                      />
                    </Link>
                  </Box>
                  <CardContent sx={{ flex: 1 }}>
                    <Stack spacing={2}>
                      <Link href={`/events/${event.id}`} style={{ textDecoration: 'none' }}>
                        <Typography variant="h5" fontWeight="bold" color="text.primary">
                          {event.title}
                        </Typography>
                      </Link>
                      <Typography color="text.secondary">
                        Date: {event.date}, {event.time}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOn fontSize="small" />
                        <Typography>{event.address}</Typography>
                      </Box>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">Registration Progress</Typography>
                          <Typography variant="body2">
                            {event.registeredCount} / {event.maxCapacity}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(event.registeredCount / event.maxCapacity) * 100}
                        />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography textAlign="center" color="text.secondary">
                暂无活动
              </Typography>
            </Grid>
          )}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Button variant="contained" color="primary" component={Link} href="/events">
            查看所有活动
          </Button>
        </Box>
      </Container>
    </Box>
  );
} 