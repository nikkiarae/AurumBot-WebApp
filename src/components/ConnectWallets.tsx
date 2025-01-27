import { Typography, Stack, Button, Grid2 } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import CardWrapper from "./Cards/CardWrapper";
import BoldText from "./BoldText";

const ConnectWalletGuide: FC = () => {
  return (
    <Stack spacing={{ xs: 2, sm: 4 }} width={"100%"}>
      {/* Step 1: Connect to Shurkin Bot */}
      <CardWrapper>
        <Grid2 container spacing={2}>
          {/* Step 1 Container */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Stack
              spacing={{ xs: 2, md: 3 }}
              height={"100%"}
              justifyContent={"space-between"}
              textAlign={"left"}
            >
              <Stack spacing={2}>
              <Typography variant="h6" fontWeight={"bold"} gutterBottom>
                  Connect to Shuriken Bot on Telegram
                </Typography>
                <Typography variant="body1">
                <BoldText text={"Shuriken Bot "} variant={"body1"} /> is your gateway to the world of meme coins. Acting as your trusted guide, it lets you effortlessly trade popular cryptocurrencies across top networks.
</Typography>
                <Typography variant="body1">
                  To begin, open
                  <BoldText text={" Shuriken Bot "} variant={"body1"} />
                  on Telegram by clicking the link below. 
                </Typography>
                <Typography variant="body1">
                  Press the
                  <BoldText text={" Start "} variant="body1" />
                  button to intitiate the Bot.
                </Typography>
              </Stack>
              <Button
                variant="contained"
                color="primary"
                size="small"
                href="https://t.me/ShurikenTradeBot?start=ref-aurum_bot"
                target="_blank"
                sx={{
                  color: "#fff",
                }}
              >
                Go to Shuriken
              </Button>
            </Stack>
          </Grid2>

          {/* Step 1 Images Section */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 6 }}>
                <Image
                  src="/assets/shuriken/shuriken_start_1.png" // Placeholder for screenshot
                  alt="Shurkin Bot"
                  width={200}
                  height={400}
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Image
                  src="/assets/shuriken/shuriken_start_2.png" // Placeholder for screenshot
                  alt="Shurkin Bot"
                  width={200}
                  height={400}
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </CardWrapper>

      {/* Step 2: Select Your Wallet Type */}
      <CardWrapper>
        <Grid2 container spacing={2}>
          {/* Step 1 Container */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Stack
              spacing={{ xs: 2, md: 3 }}
              height={"100%"}
              justifyContent={"space-between"}
              textAlign={"left"}
            >
              <Stack spacing={2}>
                <Typography variant="h6" fontWeight={"bold"} gutterBottom>
                  Select Your Wallet Type
                </Typography>
                <Typography variant="body1">
                <BoldText text={" Shuriken "} variant={"body1"} /> will ask you to select your wallet type:
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  - <BoldText text={"Solana (SOL): "} variant="body1" /> Select
                  if using Phantom with Solana.
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  - <BoldText text={"Ethereum (ETH): "} variant="body1" />{" "}
                  Select if using Phantom with Ethereum.
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  -{" "}
                  <BoldText
                    text={"Ethereum Base (ETH Base): "}
                    variant="body1"
                  />{" "}
                  Select for Ethereum Base network.
                </Typography>
                <Typography variant="body1">
                  Select <BoldText text={' import wallet'} variant="body1"/>. It will then prompt you for a private key which you can find out how to do in the next step. Once successful, you will be prompted to name your wallet.
                </Typography>
                <Typography variant="body1">
                Repeat this process for all the above networks.
                </Typography>
              </Stack>
            </Stack>
          </Grid2>

          {/* Step 1 Images Section */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 6 }}>
                <Image
                  src="/assets/shuriken/shuriken_wallets.png" // Placeholder for screenshot
                  alt="Shurkin Bot"
                  width={200}
                  height={400}
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Image
                  src="/assets/shuriken/shuriken_import.png" // Placeholder for screenshot
                  alt="Shurkin Bot"
                  width={200}
                  height={400}
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Image
                  src="/assets/shuriken/shuriken_enter.png" // Placeholder for screenshot
                  alt="Shurkin Bot"
                  width={200}
                  height={400}
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </CardWrapper>

      {/* Step 3: Provide Wallet Address */}
      <CardWrapper>
        <Grid2 container spacing={2}>
          {/* Step 1 Container */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Stack
              spacing={{ xs: 2, md: 3 }}
              height={"100%"}
              justifyContent={"space-between"}
              textAlign={"left"}
            >
              <Stack spacing={2}>
                <Typography variant="h6" fontWeight={"bold"} gutterBottom>
                  Get Private Key from Phantom
                </Typography>
                <Typography variant="body1">
                  Your wallet contains private keys for each of the main cryptocurrencies (SOL, ETH, ETH Base) which you need to provide in order to connect and use in the Shuriken Bot.
                </Typography>
                <Typography variant="body1">
                  Select <BoldText text={' import wallet'} variant="body1"/>. It will then prompt you for a private key which you can find out how to do in the next step. Once successful, you will be prompted to name your wallet.
                </Typography>
              </Stack>
            </Stack>
          </Grid2>

          {/* Step 1 Images Section */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 6 }}>
                <Image
                  src="/assets/phantom/phantom_pk_1.png" // Placeholder for screenshot
                  alt="Shurkin Bot"
                  width={200}
                  height={400}
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Image
                  src="/assets/phantom/phantom_pk_2.png" // Placeholder for screenshot
                  alt="Shurkin Bot"
                  width={200}
                  height={400}
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Image
                  src="/assets/phantom/phantom_pk_3.png" // Placeholder for screenshot
                  alt="Shurkin Bot"
                  width={200}
                  height={400}
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Image
                  src="/assets/phantom/phantom_pk_4.png" // Placeholder for screenshot
                  alt="Shurkin Bot"
                  width={200}
                  height={400}
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </CardWrapper>
    </Stack>
  );
};

export default ConnectWalletGuide;
