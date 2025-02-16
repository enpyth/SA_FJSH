'use client';

import { useEffect, useState } from 'react';
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Box,
  Paper,
  Stack,
  Divider,
  CircularProgress
} from "@mui/material";
import {
  Calendar,
  MapPin,
  Users,
  Phone,
  Mail,
  Building
} from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  location: string;
  address: string;
  price: string;
  image: string;
  registeredCount: number;
  maxCapacity: number;
  organizer: string;
  contactEmail: string;
  contactPhone: string;
  status: "upcoming" | "past";
}

export default function EventDetail({ eventId }: { eventId: string }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error('Failed to fetch event');
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!event) {
    return notFound();
  }

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', p: 3 }}>
      <Card>
        <Box sx={{ height: 300, overflow: 'hidden' }}>
          <Image
            src={"/placeholder.svg"}
            // TODO src={event.image || "/placeholder.svg"}
            alt={event.title}
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
        </Box>

        <CardContent sx={{ p: 3 }}>
          {/* 标题和状态 */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1">
              {event.title}
            </Typography>
            <Chip
              label={event.status === "upcoming" ? "即将开始" : "已结束"}
              color={event.status === "upcoming" ? "primary" : "default"}
            />
          </Box>

          {/* 基本信息 */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Calendar className="h-5 w-5" />
                <Typography>{event.date} {event.time}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <MapPin className="h-5 w-5" />
                <Typography>{event.location}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Users className="h-5 w-5" />
                <Typography>
                  已报名: {event.registeredCount}/{event.maxCapacity} 人
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Building className="h-5 w-5" />
                <Typography>主办方: {event.organizer}</Typography>
              </Stack>
            </Grid>
          </Grid>

          {/* 详细地址 */}
          <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              活动地址
            </Typography>
            <Typography>{event.address}</Typography>
          </Paper>

          {/* 活动描述 */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              活动介绍
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {event.description}
            </Typography>
          </Box>

          {/* 报名信息 */}
          <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              报名信息
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Mail className="h-5 w-5" />
                <Typography>联系邮箱: {event.contactEmail}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Phone className="h-5 w-5" />
                <Typography>联系电话: {event.contactPhone}</Typography>
              </Stack>
              <Divider />
              <Box>
                <Typography component="span" sx={{ fontWeight: 500 }}>
                  活动费用:{' '}
                </Typography>
                <Typography component="span" color="error">
                  {event.price}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* 报名按钮 */}
          {event.status === "upcoming" && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                disabled={event.registeredCount >= event.maxCapacity}
              >
                {event.registeredCount >= event.maxCapacity
                  ? "名额已满"
                  : "立即报名"}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}