'use client';
import Link from 'next/link'
import { Button, Card, CardContent, CardMedia, Typography, Container, Box, Grid } from '@mui/material'
import Carousel from '@/components/Carousel'
import SponsorScroll from '@/components/SponsorScroll'
import EventSection from '@/components/EventSection';

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

interface CarouselImage {
  src: string;
  alt: string;
}

interface Sponsor {
  name: string;
  logo: string;
  url?: string;
}

interface NewsItem {
  id: string;
  title: string;
  src: string;
  summary: string;
  showOnHomepage: boolean;
}

interface HomeClientProps {
  initialEvents: Event[];
  carouselImages: CarouselImage[];
  sponsors: Sponsor[];
  newsItems: NewsItem[];
}

export default function HomeClient({ 
  initialEvents,
  carouselImages,
  sponsors,
  newsItems
}: HomeClientProps) {
  // Filter news items to only show those marked for homepage display
  const visibleNewsItems = newsItems.filter(item => item.showOnHomepage);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      {/* 轮播图 */}
      <Box sx={{ width: '100%', position: 'relative' }}>
        <Carousel images={carouselImages} fullWidth={true} />
      </Box>

      {/* 商会简介 */}
      <Box component="section" sx={{ py: 12, bgcolor: 'background.paper' }}>
        <Container>
          <Typography variant="h3" fontWeight="bold" mb={6} textAlign="center">
            商会简介
          </Typography>
          <Typography variant="h6" textAlign="center" maxWidth="800px" mx="auto">
            我们的商会致力于促进商业合作、推动行业发展、为会员提供全方位服务与支持。通过组织各类活动、提供资源和平台，我们旨在创造一个繁荣的商业生态系统，助力会员企业实现可持续增长。
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Button variant="contained" color="primary" component={Link} href="/about">
              了解更多
            </Button>
          </Box>
        </Container>
      </Box>

      <EventSection events={initialEvents} />

      {/* 新闻资讯 */}
      <Box component="section" sx={{ py: 16, bgcolor: 'grey.100' }}>
        <Container>
          <Typography variant="h3" fontWeight="bold" mb={8} textAlign="center">
            新闻资讯
          </Typography>
          <Grid container spacing={4}>
            {visibleNewsItems.map((item) => (
              <Grid item xs={12} md={6} lg={4} key={item.id}>
                <Card sx={{ height: '100%' }}>
                  <Link href={`/news/${item.id}`} style={{ textDecoration: 'none' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.src}
                      alt={item.title}
                    />
                  </Link>
                  <CardContent>
                    <Typography color="text.secondary">
                      {item.summary}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 赞助商 */}
      <Box component="section" sx={{ py: 16 }}>
        <Container>
          <Typography variant="h3" fontWeight="bold" mb={8} textAlign="center">
            赞助商
          </Typography>
          <SponsorScroll sponsors={sponsors} />
        </Container>
      </Box>
    </Box>
  )
} 