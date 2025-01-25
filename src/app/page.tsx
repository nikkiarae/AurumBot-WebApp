import React from "react";
import {
  Stack,
} from "@mui/material";
import Hero from "@/components/Hero";
// import Influencers from "@/components/Influencers";


const AppLandingPage = () => {
  return (
    
      <Stack spacing={3} sx={{ mb: 4 }} alignItems={'center'}>
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        {/* <Influencers /> */}
        
      </Stack>
  );
};

export default AppLandingPage;
