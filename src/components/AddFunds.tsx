import { Typography, Stack, Grid2 } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import CardWrapper from "./Cards/CardWrapper";
import BoldText from "./BoldText";

const AddFunds: FC = () => {
  return (
    <Stack spacing={{ xs: 2, sm: 4 }} width={"100%"}>
      {/* Step 1: Add Funds using Phantom */}
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
                  Add Funds using Phantom
                </Typography>
                <Typography variant="body1">
                    Press the <BoldText text=' Buy ' variant="body1"/> Button.
                </Typography>
                <Typography variant="body1">
                  Select the crypto currency you wish to purchase. You will need to do sperate transactions for each crypto currency.
                </Typography>
                <Typography variant="body1">
                  Continue with the following screens to add payment methods.
                </Typography>
                <Typography variant="body1">
                  Once complete, you should see the funds in the Phantom Wallet and in the Shuriken Bot.
                </Typography>
              </Stack>
            </Stack>
          </Grid2>

          {/* Step 1 Images Section */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 6 }}>
                <Image
                  src="/assets/phantom/phantom_buy_1.png" // Placeholder for screenshot
                  alt="Shurkin Bot"
                  width={200}
                  height={400}
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Image
                  src="/assets/phantom/phantom_buy_2.png" // Placeholder for screenshot
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

      {/* Step 2: Add Funds using Exchange */}
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
                  Add Funds using Exchange
                </Typography>
                <Typography variant="body1">
                    If you wish to purchase or transfer funds on a Crypto Exchange such as <BoldText text=' Kraken, Coinbase, Crypto ' variant="body1"/> etc You can send them directly to your Phantom Wallet instantly
                </Typography>
                <Typography variant="body1">
                  In your <BoldText text=' Phantom Wallet ' variant="body1"/> click the crypto you would you like to receive. 
                </Typography>
                <Typography variant="body1">
                Press the <BoldText text=' Recieve ' variant="body1"/> button.
                </Typography>
                <Typography variant="body1">
                You can then access the QR code or address that your Crypto Exchange will request.
                </Typography>
                <Typography variant="body1">
                Continue by following the instructions given by the respective Crypto Exchange.
                </Typography>
                <Typography variant="body1">
                  Once complete, you should see the funds in the Phantom Wallet and on Shuriken.
                </Typography>
              </Stack>
            </Stack>
          </Grid2>

          {/* Step 1 Images Section */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 6 }}>
                <Image
                  src="/assets/phantom/phantom_recieve_1.png" // Placeholder for screenshot
                  alt="Shurkin Bot"
                  width={200}
                  height={400}
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Image
                  src="/assets/phantom/phantom_recieve_2.png" // Placeholder for screenshot
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

export default AddFunds;
