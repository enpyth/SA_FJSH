import { Container } from '@mui/material';
import { AboutSection } from './components/AboutSection';
import { ConstitutionSection } from './components/ConstitutionSection';
import { DirectorsSection } from './components/DirectorsSection';

export default function About() {
    return (
        <Container sx={{ py: 12, px: 6 }}>
            {/* <AboutSection /> */}
            <ConstitutionSection />
            <DirectorsSection />
        </Container>
    );
}

