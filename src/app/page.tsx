import React from "react";
import {
  Box,
  Grid2,
  Container,
  Stack,
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import background from "../public/assets/background.png";
import FeatureCard from "@/components/FeatureCard";
import { Feature } from "@/types/general";
import LeftSide from "@/components/LeftSide";
import RightSide from "@/components/RightSide";
import { FaXTwitter, FaThreads } from "react-icons/fa6";
import { AiOutlineDollar } from "react-icons/ai";

const features: Feature[] = [
  {
    number: 1,
    title: "Golden",
    description:
      'A "Golden" token is one that meets specific criteria for both performance and potential. It\'s marked as a premium pick with high success indicators.',
  },
  {
    number: 2,
    title: "New",
    description:
      '"New" tokens are recently created tokens, usually less than 6 hours old. They’re evaluated based on short-term performance metrics like buy-to-sell ratios, volume, and price changes.',
  },
  {
    number: 3,
    title: "Boosted",
    description:
      '"Boosted" tokens are gaining rapid attention and trading volume within a short timeframe. These tokens are experiencing significant activity and could indicate growing interest.',
  },
  {
    number: 4,
    title: "Insider",
    description:
      '"Insider" tokens are based on curated selections or insights provided by trusted sources or analysis. These are handpicked for their potential value.',
  },
];

const AppLandingPage = () => {
  return (
    <Box
      sx={{
        background: "black",
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <AppBar position="static" sx={{ background: "rgba(0,0,0,0.8)" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <AiOutlineDollar />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AurumBot
          </Typography>
          <Button
            color="inherit"
            variant="contained"
            href="https://t.me/AurumCryptoBot"
            target="_blank"
            sx={{
              backgroundColor: "#DAA520",
            }}
          >
            <Typography variant="body1" sx={{ color: "#fff", fontWeight: "bold" }}>
          Join Now
        </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Stack spacing={3} sx={{ mb: 4 }}>
        {/* Hero Section */}
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            padding: { xs: `60px 20px 0 20px`, md: `100px 70px 0 70px` },
          }}
        >
          <Grid2 container spacing={{ xs: 4, md: 8 }} alignItems={"center"}>
            {/* Left Content */}
            <Grid2 size={{ xs: 12, md: 8 }}>
              <LeftSide />
            </Grid2>

            {/* Right Image */}
            <Grid2 size={{ xs: 12, md: 4 }}>
              <RightSide />
            </Grid2>
          </Grid2>
        </Container>

        {/* Features Section */}
        <Box sx={{ padding: { sm: "30px 0", md: "80px 0" } }}>
          <Container maxWidth="lg">
            <Grid2
              container
              spacing={3}
              justifyContent="center"
              alignItems="stretch"
            >
              {/* Features */}
              {features.map((feature, idx) => (
                <Grid2 key={idx} size={{ xs: 12, sm: 6, md: 3 }}>
                  <FeatureCard feature={feature} />
                </Grid2>
              ))}
            </Grid2>
          </Container>
        </Box>
      </Stack>
      {/* Footer */}
      <Box
        component="footer"
        sx={{
          background: "rgba(0,0,0,0.9)",
          color: "white",
          py: 4,
          mt: "auto",
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
    </Box>
  );
};

export default AppLandingPage;
