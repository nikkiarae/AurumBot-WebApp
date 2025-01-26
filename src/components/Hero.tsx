import { FC } from "react";
import {
    Grid2,
    Container,
  } from "@mui/material";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const Hero: FC = () => {
  return (
    <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            padding: { xs: `0px 10px 0 10px`, md: `50px 70px 0 70px` },
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
  );
};

export default Hero;