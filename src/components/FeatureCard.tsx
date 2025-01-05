import { Feature } from "@/types/general";
import { Card, Typography } from "@mui/material";
import { FC } from "react";

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: FC<FeatureCardProps> = ({ feature }) => {
  return (
    <Card
      elevation={0}
      sx={{
        textAlign: "center",
        padding: "22px",
        borderRadius: 4,
        height: "100%",
        backgroundColor: "#1c1c1c", // Dark background matching the app
        border: "3px solid #4f4f4f", // Subtle border to blend with the theme
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#DAA520", // Vibrant gold for the number
        }}
      >
        {`0${feature.number}`}
      </Typography>
      <Typography
        variant="h4"
        sx={{
          margin: "10px 0",
          fontWeight: "bold",
          color: "#DAA520", // Softer golden color for the title
        }}
      >
        {feature.title}
      </Typography>
      <Typography
        variant="body1"
        color="#fff"
        sx={{
          marginBottom: "20px",
        }}
      >
        {feature.description}
      </Typography>
    </Card>
  );
};

export default FeatureCard;