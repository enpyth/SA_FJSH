import { Box, Card, CardContent, Typography } from '@mui/material';

export function ConstitutionSection() {
    return (
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
    );
} 