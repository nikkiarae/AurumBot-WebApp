import {
  Avatar,
  Typography,
  Box,
  Stack,
  IconButton,
} from "@mui/material";
import { FC } from "react";
import { App } from "@/types/general";
import CardWrapper from "./CardWrapper";
import Image from "next/image";

interface AppCardProps {
  app: App;
}

const AppCard: FC<AppCardProps> = ({ app }) => {
  const renderStepText = (step: string) => {
    // Replace text inside ** with bold styling
    const regex = /\*\*(.*?)\*\*/g;
    const parts = step.split(regex);

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // Make text bold (inside **) and inline
        return (
          <Typography key={index} variant="body2" sx={{ fontWeight: 'bold', display: 'inline' }}>
            {part}
          </Typography>
        );
      } else {
        // Regular text, inline as well
        return (
          <Typography key={index} variant="body2" sx={{ display: 'inline' }}>
            {part}
          </Typography>
        );
      }
    });
  };

  return (
    <CardWrapper>
      {/* Content Section */}
      <Box
        sx={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* App Name and Icons Inline */}
        <Stack direction="row" justifyContent={"space-between"} sx={{ mb: 2 }}>
          <Stack direction={"row"} spacing={1.5} alignItems="center">
            <Avatar src={app.icon} sx={{ width: 30, height: 30 }} />{" "}
            {/* Smaller Avatar */}
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold" }}
            >
              {app.name}
            </Typography>
          </Stack>
          {/* App Store and Google Play Icons */}
          <Stack direction="row" spacing={{xs: 2, md: 3}} sx={{ marginLeft: 2 }}>
            {app.iosLink && (
              <IconButton
                color="primary"
                href={app.iosLink}
                target="_blank"
                aria-label="Download on the App Store"
                sx={{
                  width: 30,
                  height: 30,
                  padding: 0,
                }}
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/2048px-App_Store_%28iOS%29.svg.png" // App Store banner URL
                  alt="Download on the App Store"
                  width={30}
                  height={30}
                />
              </IconButton>
            )}
            {app.androidLink && (
              <IconButton
                color="primary"
                href={app.androidLink}
                target="_blank"
                aria-label="Get it on Google Play"
                sx={{
                  width: 30,
                  height: 30,
                  padding: 0,
                }}
              >
                <Image
                  src="https://www.svgrepo.com/show/223032/playstore.svg" // Google Play banner URL
                  alt="Get it on Google Play"
                  width={30}
                  height={30}
                />
              </IconButton>
            )}
          </Stack>
        </Stack>

        <Typography
          variant="body1"
          sx={{ marginTop: "8px", textAlign: "left" }}
        >
          {app.description}
        </Typography>

        <Box sx={{ marginTop: "16px" }}>
          <Typography
            variant="h6"
            sx={{ marginBottom: "8px", fontWeight: "bold", textAlign: "left" }}
          >
            Steps to get started:
          </Typography>
          <ol style={{ paddingLeft: "20px", textAlign: "left" }}>
            {app.steps.map((step, index) => (
              <li key={index}>
                {renderStepText(step)}
              </li>
            ))}
          </ol>
        </Box>
      </Box>
    </CardWrapper>
  );
};

export default AppCard;