import { Box, Container, Typography, Grid, Avatar, Card, CardContent } from '@mui/material';
import { directors } from '@/data/about';

export default function About() {
    return (
        <Container sx={{ py: 12, px: 6 }}>
            {/* 简介部分 */}
            <Box mb={8}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                            关于我们
                        </Typography>
                        <Typography color="text.secondary" gutterBottom>
                            了解我们的使命和价值观
                        </Typography>
                        <Typography paragraph>
                            我们的商会成立于[年份]，致力于促进[地区/行业]的商业发展和合作。作为一个非营利组织，我们为会员提供各种资源和机会，帮助他们在竞争激烈的商业环境中取得成功。
                        </Typography>
                        <Typography paragraph>我们的使命是：</Typography>
                        <Box component="ul" sx={{ pl: 4 }}>
                            <li>促进会员之间的交流与合作</li>
                            <li>提供商业信息和市场洞察</li>
                            <li>组织高质量的商业活动和培训</li>
                            <li>代表会员利益，与政府和其他组织沟通</li>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            {/* 章程部分 */}
            <Box mb={8}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                            商会章程
                        </Typography>
                        <Typography color="text.secondary" gutterBottom>
                            我们的组织结构和运作方式
                        </Typography>
                        <Typography variant="h6" mt={4} mb={2} fontWeight="bold">
                            第一章：总则
                        </Typography>
                        <Typography paragraph>
                            本商会是由[地区/行业]的企业自愿组成的非营利性社会团体。
                        </Typography>
                        <Typography variant="h6" mt={4} mb={2} fontWeight="bold">
                            第二章：会员
                        </Typography>
                        <Typography paragraph>
                            凡认同本商会章程的企业和个人，均可申请成为会员。
                        </Typography>
                        <Typography variant="h6" mt={4} mb={2} fontWeight="bold">
                            第三章：组织机构
                        </Typography>
                        <Typography paragraph>
                            本商会设会员大会、理事会、监事会和秘书处。
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* 理事会成员部分 */}
            <Box>
                <Box mb={6}>
                    <Typography variant="h4" fontWeight="bold" mb={4}>
                        理事会成员
                    </Typography>

                    {/* 会长 */}
                    <Typography variant="h5" color="primary" gutterBottom>
                        会长
                    </Typography>
                    <Grid container spacing={3}>
                        {directors.filter(d => d.role === "会长").map((director, index) => (
                            <Grid item xs={12} md={6} lg={4} key={index}>
                                <Card>
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Avatar
                                            sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                                            alt={director.name}
                                            src={director.image}
                                        />
                                        <Typography variant="h6" gutterBottom fontWeight="bold">
                                            {director.name}
                                        </Typography>
                                        <Typography color="text.secondary" gutterBottom>
                                            {director.company}
                                        </Typography>
                                        <Typography>
                                            {director.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* 副会长 */}
                <Box mb={6}>
                    <Typography variant="h5" color="primary" gutterBottom>
                        副会长
                    </Typography>
                    <Grid container spacing={3}>
                        {directors.filter(d => d.role === "副会长").map((director, index) => (
                            <Grid item xs={12} md={6} lg={4} key={index}>
                                <Card>
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Avatar
                                            sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                                            alt={director.name}
                                            src={director.image}
                                        />
                                        <Typography variant="h6" gutterBottom fontWeight="bold">
                                            {director.name}
                                        </Typography>
                                        <Typography color="text.secondary" gutterBottom>
                                            {director.company}
                                        </Typography>
                                        <Typography>
                                            {director.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* 理事 */}
                <Box>
                    <Typography variant="h5" color="primary" gutterBottom>
                        理事
                    </Typography>
                    <Grid container spacing={3}>
                        {directors.filter(d => d.role === "理事").map((director, index) => (
                            <Grid item xs={12} md={6} lg={4} key={index}>
                                <Card>
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Avatar
                                            sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                                            alt={director.name}
                                            src={director.image}
                                        />
                                        <Typography variant="h6" gutterBottom fontWeight="bold">
                                            {director.name}
                                        </Typography>
                                        <Typography color="text.secondary" gutterBottom>
                                            {director.company}
                                        </Typography>
                                        <Typography>
                                            {director.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

