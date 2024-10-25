import React from 'react';
import { Container, Typography } from '@mui/material';

const About: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>О нас</Typography>
      <Typography variant="body1">
        Это блог, созданный для демонстрации функциональности.
      </Typography>
    </Container>
  );
};

export default About;