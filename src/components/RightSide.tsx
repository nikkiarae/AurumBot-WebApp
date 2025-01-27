"use client";

import { Box, Card, useTheme } from "@mui/material";
import { FC } from "react";

const RightSide: FC = () => {
  const theme = useTheme()
  return (
    <Card
      elevation={2}
      sx={{
        width: "100%", // Responsive width
        maxWidth: 390, // Max width to match iPhone 13 Pro
        aspectRatio: "390 / 774", // Maintains the 9:19 aspect ratio
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20px",
        backgroundColor: theme.palette.background.paper, // Matches the black theme
        border: `3px solid ${theme.palette.primary.main}`, // Gold border for style
        margin: "0 auto", // Centers it horizontally
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <video
          autoPlay
          loop
          muted 
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            pointerEvents: "none",
          }}
        >
          <source src="/assets/video.MP4" type="video/mp4" />
        </video>
      </Box>
    </Card>
  );
};

export default RightSide;
