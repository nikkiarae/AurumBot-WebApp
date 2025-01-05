import React from "react";
import {
  Box,
  Grid2,
  Container,
} from "@mui/material";
import background from "../public/assets/background.png";
import FeatureCard from "@/components/FeatureCard";
import { Feature } from "@/types/general";
import LeftSide from "@/components/LeftSide";
import RightSide from "@/components/RightSide";

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
        background: 'black',
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container>
        {/* Hero Section */}
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            padding: { xs: `60px 20px 0 20px`, md: `100px 70px 0 70px`},
          }}
        >
          <Grid2 container spacing={{ xs: 4, md: 8 }} alignItems={'center'}>
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
        <Box sx={{ padding: {sm: "30px 0", md: "80px 0" }}}>
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
      </Container>
    </Box>
  );
};

export default AppLandingPage;
