import { Box, Card, CardContent, Typography } from '@mui/material';

export function AboutSection() {
    return (
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
    );
} 