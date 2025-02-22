"use client";

import { Box, Container, Grid2, IconButton, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { FaXTwitter, FaThreads } from "react-icons/fa6";

const Footer: FC = () => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      
      sx={{
        py: 4,
        mt: "auto",
        backgroundColor: theme.palette.background.paper
      }}
    >
      <Container maxWidth="lg">
        <Grid2 container spacing={3} alignItems="center">
          <Grid2 size={{ xs: 12 }}>
            <IconButton
              color="inherit"
              component="a"
              href="https://x.com/aurumbot"
              target="_blank"
            >
              <FaXTwitter />
            </IconButton>
            <IconButton
              color="inherit"
              component="a"
              href="https://www.threads.net/@aurum_bot_"
              target="_blank"
            >
              <FaThreads />
            </IconButton>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Typography variant="body1" align="left">
              © 2025 AurumBot. All Rights Reserved.
            </Typography>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Footer;
