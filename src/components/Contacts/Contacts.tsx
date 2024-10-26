import React from "react";
import { Container, Typography } from "@mui/material";

const Contacts: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Контакты
      </Typography>
      <Typography variant="body1">
        Вы можете связаться с нами по электронной почте: example@example.com.
      </Typography>
    </Container>
  );
};

export default Contacts;
