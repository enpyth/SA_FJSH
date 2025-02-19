import { Box, Stack, Typography } from '@mui/material';
import { CalendarToday, AccessTime, LocationOn } from '@mui/icons-material';

interface MeetingInfoProps {
  date: string;
  time?: string;
  address?: string;
}

export function MeetingInfo({ date, time, address }: MeetingInfoProps) {
  return (
    <Stack 
      spacing={2} 
      sx={{ 
        color: 'text.secondary',
        mb: 4,
        bgcolor: 'grey.50',
        p: 2.5,
        borderRadius: 1
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CalendarToday sx={{ mr: 2, fontSize: 20, color: 'primary.main' }} />
        <Typography variant="body1">{date}</Typography>
      </Box>

      {time && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccessTime sx={{ mr: 2, fontSize: 20, color: 'primary.main' }} />
          <Typography variant="body1">{time}</Typography>
        </Box>
      )}

      {address && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOn sx={{ mr: 2, fontSize: 20, color: 'primary.main' }} />
          <Typography variant="body1">{address}</Typography>
        </Box>
      )}
    </Stack>
  );
} 