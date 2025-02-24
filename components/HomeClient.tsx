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
      <Box component="section" sx={{ py:8, bgcolor: 'background.paper' }}>
        <Container>
          {/* <Typography variant="h3" fontWeight="bold" mb={6} textAlign="center">
            商会简介
          </Typography> */}
          <Typography variant="h6" maxWidth="800px" mx="auto">
          澳洲福建商会是一个服务澳大利亚福建籍企业家及乡亲的非营利性组织。我们的使命是通过为福建籍企业家提供教育，社会和信息服务，培育一个充满活力的商业社区。我们致力于通过为福建籍企业家提供更好的商业和国际贸易机会，推动闽商在澳大利亚的投资与发展，促进中澳经济的交流与合作。
          </Typography>
          <Typography variant="h6" maxWidth="800px" mx="auto" mt={5}>
          澳洲福建商会愿与会员共同努力打造一个为闽商增进了解，交流与合作的平台，增强与中澳政府的合作，促进与全球其他商业组织的协作，帮助闽商在澳大利亚拓展业务。
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