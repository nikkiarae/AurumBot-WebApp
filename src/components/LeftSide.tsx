import { Box, Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { FaStripe } from "react-icons/fa6";

const LeftSide: FC = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h2" sx={{ fontWeight: "bold" }}>
        Aurum
        <Typography
          variant="h2"
          component="span"
          color='primary'
          fontWeight="bold"
        >
          Bot
        </Typography>
      </Typography>
      <Typography
        variant="h4"
        sx={{ margin: "10px 0" }}
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
        sx={{ margin: "10px 0", fontWeight: "bold"}}
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
        $19.99
        <Typography
          variant="h5"
          component="span"
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
      <Stack spacing={1} direction={'row'} justifyContent={'center'} alignItems={'center'} sx={{ textAlign: "center", mt: 2 }}>
        {/* Stripe logo */}
        
        <Typography
          variant="body1"
          sx={{ color: "#666", marginTop: "10px" }}
        >
          Powered by
        </Typography>
        <FaStripe size={40}/>
        <Typography
          variant="body1"
          sx={{ color: "#666", marginTop: "10px" }}
        >
          for secure payments.
        </Typography>
      </Stack>
    </Box>
  );
};

export default LeftSide;
