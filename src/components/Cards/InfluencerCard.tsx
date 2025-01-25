import { fetchInfluencer } from "@/lib/api/influencers";
import { Influencer } from "@/types/influencer";
import { Avatar, IconButton, Box } from "@mui/material";
import { FC } from "react";
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import ThreadsIcon from '@mui/icons-material/Language'; // Or use any other icon suitable for Threads
import CardWrapper from "./CardWrapper";

interface InfluencerCardProps {
  influencer: Influencer;
}

const InfluencerCard: FC<InfluencerCardProps> = async ({ influencer }) => {
  const data = await fetchInfluencer(influencer.chatId);
  const { telegram, x, threads } = influencer.links;

  return (
    <CardWrapper>
      {/* Large Avatar */}
      <Avatar
        sx={{
          width: 100,
          height: 100,
          marginBottom: 2,
          border: "3px solid #DAA520", // Golden border for contrast
        }}
        src={data!} // Assuming 'profilePhotoUrl' exists
        alt="PFP"
      />

      {/* Social Media Links (Icons) */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        {telegram && (
          <IconButton href={telegram} target="_blank" sx={{ color: "#0088cc" }}>
            <TelegramIcon />
          </IconButton>
        )}
        {x && (
          <IconButton href={x} target="_blank" sx={{ color: "#1DA1F2" }}>
            <TwitterIcon />
          </IconButton>
        )}
        {threads && (
          <IconButton href={threads} target="_blank" sx={{ color: "#FF4F00" }}>
            <ThreadsIcon />
          </IconButton>
        )}
      </Box>
      </CardWrapper>
  );
};

export default InfluencerCard;