import { Typography, Stack, Grid2, Alert, Button } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import CardWrapper from "./Cards/CardWrapper";
import BoldText from "./BoldText";
import Link from "next/link";
import { TELEGRAM_URL } from "@/lib/constants/config";

const StartTrading: FC = () => {
  return (
    <Stack spacing={{ xs: 2, sm: 4 }} width={"100%"}>
      <Stack sx={{ width: "100%" }} spacing={1}>
        <Alert severity="error">Do your own research. AurumBot is not responsible for any invstment decisions or financial losees.</Alert>
        <Alert severity="warning">Dont be greedy, the crypto world is extremely volatile. Be happy with small gains.</Alert>
      </Stack>
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
                  Notifications with AurumBot
                </Typography>
                <Typography variant="body1">
                    To proceed and get new meme coins you will need to subscribe to AurumBot using Telegram.
                </Typography>
                <Button variant={'contained'} component={Link} href={TELEGRAM_URL} sx={{ color: "#fff", fontWeight: 'bold', textTransform: 'none'}}>Go To AurumBot</Button>
                <Typography variant="body1">
                  Once you are subscribed to AurumBot through Telegram, you will begin receiving notifications of potential coins from trusted and well known crypto traders.
                </Typography>
                <Typography variant="body1">
                  Use the provided links and coin metrics to make an informed desicion. 
                </Typography>
                <Stack spacing={1}>
                    <Typography variant="body1" color="textSecondary">
                        - Does it have good volume?
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        - Is the chart gradually moving up or is it going down?
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        - Does it have Socials?
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        - Is the Market Cap low or high?
                    </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid2>

          {/* Step 1 Images Section */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 6 }}>
                <Image
                  src="/assets/aurum/aurumbot_home.png" // Placeholder for screenshot
                  alt="Shurkin Bot"
                  width={200}
                  height={400}
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Image
                  src="/assets/aurum/aurumbot_dyor.png" // Placeholder for screenshot
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

      {/* Step 2: Make yout first trade */}
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
                  Make Your First Trade
                </Typography>
                <Typography variant="body1">
                  So you decided to buy the coin? Instantly start trading by pressing the <BoldText text=" Shuriken " variant="body1" /> link 
                </Typography>
                <Typography variant="body1">
                  You can only buy as much of coin as whats in your wallet
                </Typography>
                <Typography variant="body1">
                  Use the Buy options to make the transaction. You will need to confirm the purchase.
                </Typography>
                <Typography variant="body1">
                  Press <BoldText text=" Refresh " variant="body1" /> to view your current profits or losses on the coin
                </Typography>
                <Typography variant="body1">
                  Refer back to the chart to see the visual progression of the coin
                </Typography>
              </Stack>
            </Stack>
          </Grid2>

          {/* Step 1 Images Section */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 6 }}>
                <Image
                  src="/assets/aurum/aurumbot_start_trade.png" // Placeholder for screenshot
                  alt="Shurkin Bot"
                  width={200}
                  height={400}
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Image
                  src="/assets/aurum/aurumbot_shuriken_buy.png" // Placeholder for screenshot
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

      {/* Step 3: Make Money */}
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
                 Take your Profits
                </Typography>
                <Typography variant="body1">
                  So youve made some money and you want to cash out? You have two options:
                </Typography>
                <Typography variant="body1">
                  <BoldText text={"Option 1: "} variant="body1" />
                  Sell all and walk away with your profits, and have more money for your next trade
                </Typography>
                <Typography variant="body1">
                  <BoldText text={"Option 2: "} variant="body1" />
                  Sell your initial investment and take some small profit, and keep a <BoldText text={"Moon Bag"} variant="body1" />, just incase it rockets.
                </Typography>
              </Stack>
            </Stack>
          </Grid2>

          {/* Step 1 Images Section */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 6 }}>
                <Image
                  src="/assets/aurum/aurumbot_shuriken_sell.png" // Placeholder for screenshot
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

export default StartTrading;
