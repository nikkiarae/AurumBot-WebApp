import { Box, Container, Grid2 } from "@mui/material";
import { FC } from "react";
import InfluencerCard from "./Cards/InfluencerCard";
import { fetchInfluencers } from "@/lib/api/influencers";
import { Influencer } from "@/types/influencer";

const FeatureCard: FC = async () => {
  const influencers: Influencer[] = await fetchInfluencers();

  return (
    <Box sx={{ padding: { sm: "30px 0", md: "80px 0" } }}>
      <Container maxWidth="lg">
        <Grid2
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
        >
          {influencers.map((influencer, idx) => (
            <Grid2 key={idx} size={{ xs: 12, sm: 6, md: 3 }}>
              <InfluencerCard influencer={influencer} />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default FeatureCard;
