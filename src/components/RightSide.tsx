import { Box, Card, Typography } from "@mui/material";
import { FC } from "react";

const RightSide: FC = () => {
    return (
      <Card
        elevation={2}
        sx={{
          width: "100%", // Responsive width
          maxWidth: 390, // Max width to match iPhone 13 Pro
          aspectRatio: "390 / 844", // Maintains the 9:19 aspect ratio
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "20px",
          backgroundColor: "#1c1c1c", // Matches the black theme
          border: "2px solid #FFD700", // Gold border for style
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
          <Typography
            variant="h6"
            sx={{ color: "#FFD700", textAlign: "center", padding: "20px" }}
          >
            Video Placeholder <br /> (Responsive)
          </Typography>
        </Box>
      </Card>
    );
  };

export default RightSide;
