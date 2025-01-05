import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";

const LeftSide: FC = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h2" sx={{ fontWeight: "bold", color: "#fff" }}>
        Aurum{" "}
        <Typography
          variant="h2"
          component="span"
          color="#DAA520"
          fontWeight="bold"
        >
          Bot
        </Typography>
      </Typography>
      <Typography
        variant="h4"
        sx={{ margin: "10px 0", color: "#fff", }}
      >
        Your golden gateway to meme coin opportunities
      </Typography>
      <Typography
        variant="h5"
        sx={{
          margin: "20px 0",
          color: "#666",
          lineHeight: "1.6",
        }}
      >
        Discover the hottest new tokens and exclusive investment insights with
        the power of Aurum Bot. Designed for traders, by traders.
      </Typography>
      <Typography
        variant="h4"
        sx={{ margin: "10px 0", fontWeight: "bold", color: "#fff" }}
      >
        <Typography
          variant="h4"
          component="span"
          color="#DAA520"
          fontWeight="bold"
          textTransform={'uppercase'}
        >
          Only{" "}
        </Typography>
        $14.99
        <Typography
          variant="h5"
          component="span"
          color="#fff"
          fontWeight="bold"
        >
          /mth
        </Typography>
      </Typography>
      <Button
        variant="contained"
        size="large"
        href="https://t.co/AuytGwAzOs"
        target="_blank"
        rel="noopener"
        sx={{
          backgroundColor: "#DAA520",
          padding: "15px 30px",
          marginTop: "20px",
        }}
      >
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
          Subscribe Now
        </Typography>
      </Button>
    </Box>
  );
};

export default LeftSide;
