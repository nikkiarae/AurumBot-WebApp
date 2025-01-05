import { Box, Card } from "@mui/material";
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
          <video
            src="../public/assets/video.mp4"
            autoPlay 
            loop
            style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
            }}
        />
        </Box>
      </Card>
    );
};

export default RightSide;
