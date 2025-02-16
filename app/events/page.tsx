import Link from "next/link"
import Image from "next/image"
import { getAllEvents } from "@/src/queries/select"
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Grid,
} from "@mui/material"
import { MapPin, Calendar } from "lucide-react"

export default async function EventsPage() {
  const events = await getAllEvents()

  return (
    <Box sx={{ maxWidth: "lg", mx: "auto", p: 3 }}>
      <Typography variant="h4" component="h1" align="center" sx={{ mb: 4 }}>
        所有活动
      </Typography>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Link href={`/events/${event.id}`}>
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  width={400}
                  height={200}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              </Link>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="h6" component="h2">
                      {event.title}
                    </Typography>
                    <Chip
                      label={event.status}
                      color={event.status === "upcoming" ? "primary" : "default"}
                      size="small"
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Calendar className="mr-1 h-4 w-4" />
                    <Typography variant="body2">{event.date}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <MapPin className="mr-1 h-4 w-4" />
                    <Typography variant="body2">{event.address}</Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  href={`/events/${event.id}`}
                  size="small"
                  color="primary"
                >
                  查看详情
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}


