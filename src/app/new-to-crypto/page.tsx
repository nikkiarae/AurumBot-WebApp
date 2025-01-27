"use client";

import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
  Grid2,
  Stack,
} from "@mui/material";
import AppCard from "@/components/Cards/AppCard";
import { App } from "@/types/general";
import ConnectWallets from "@/components/ConnectWallets";
import StartTrading from "@/components/StartTrading";
import AddFunds from "@/components/AddFunds";

// Data for each app
const appData: App[] = [
  {
    name: "Phantom Wallet",
    description:
      "Phantom Wallet is a crypto wallet designed to view your blockchain interactions, allowing you to buy, send, and receive tokens securely.",
    steps: [
      "Visit phantom.app or download the Phantom Wallet app from the App Store/Google Play Store.",
      "Open the app and tap on 'Create New Wallet' to begin the setup process.",
      "Write down the **12-word recovery phrase** that will be shown to you on the screen. **Store it in a secure location** (offline, not in cloud storage or emails).",
      "Confirm your recovery phrase by selecting the words in the correct order to verify that you've saved it properly.",
      "Set a **strong password** for accessing your wallet. Make sure it's unique and secure.",
      "Once your wallet is created, you can send, receive, and store crypto tokens securely.",
      "**Do not share your recovery phrase** with anyone. It is the only way to recover your wallet if you lose access.",
    ],
    icon: "https://store-images.s-microsoft.com/image/apps.42831.782f1ae5-d3e1-44a8-89a5-b81f4d64daba.a17bea0c-8b72-4e6b-b160-63e2ec2dd58e.dd9bf24d-35a5-410b-b512-bef379ed0589",
    iosLink: "https://apps.apple.com/app/phantom-wallet/id1600832604", // iOS App Store link
    androidLink:
      "https://play.google.com/store/apps/details?id=com.phantom.app", // Android Google Play link
    link: "https://www.example.com",
  },
  {
    name: "Telegram",
    description:
      "Telegram is used for communication in crypto trading groups, where traders share insights and tips on the latest market trends.",
    steps: [
      "Go to the App Store or Google Play Store and install Telegram.",
      "Open the app and sign up with your phone number. Choose a **strong and secure password** for your Telegram account.",
      "We recommend keeping your identity hidden. Use random name and a username for the remaining part of your profile",
      "If you plan to use Telegram for receiving sensitive information or trading signals, **avoid sharing personal info** in public groups.",
      "Keep your account secure by enabling **2-step verification** and make sure you do not share your **recovery code** with anyone.",
    ],
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png",
    iosLink: "https://apps.apple.com/app/telegram-messenger/id686449807", // iOS App Store link
    androidLink:
      "https://play.google.com/store/apps/details?id=org.telegram.messenger", // Android Google Play link
    link: "https://www.example.com",
  },
  {
    name: "Dexscreener",
    description:
      "Dexscreener provides real-time tracking and analytics for decentralized exchanges (DEX), helping traders monitor token prices and volume.",
    steps: [
      "Open your browser and go to www.dexscreener.com.",
      "Create an account by entering your email and setting a **strong password**. Ensure the password is unique and not reused elsewhere.",
      "Confirm the email address by clicking on the verification link sent to your inbox and log in.",
      "Once logged in, connect your crypto wallet (e.g., Phantom Wallet or Trust Wallet) to Dexscreener to begin tracking your token holdings and trades.",
    ],
    icon: "https://i.pinimg.com/736x/e6/2d/e6/e62de698746dfcb09d2d64f85371eed1.jpg",
    iosLink: "https://apps.apple.com/app/dexscreener/id1547019563", // iOS App Store link
    androidLink:
      "https://play.google.com/store/apps/details?id=com.dexscreener.dexscreener", // Android Google Play link
    link: "https://www.example.com",
  },
];

const OnboardingPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <Box sx={{ textAlign: "center", pb: {xs: 1, md: 2} }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Getting Started with Crypto
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          gutterBottom
          sx={{ margin: "10px 0" }}
        >
          Follow the steps below to get started with the basic apps required for
          crypto trading and communication.
        </Typography>
      </Box>

      {/* Tabs Navigation */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
        sx={{
          marginBottom: "20px",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tab label="Download Apps" />
        <Tab label="Connect Wallet" />
        <Tab label="Add Funds" />
        <Tab label="Start Trading" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ paddingTop: { xs: 1, md: 2 } }}>
        {/* Step 1: Download Apps */}
        {selectedTab === 0 && (
          <Stack spacing={{ xs: 2, sm: 4 }} sx={{ alignItems: "center" }}>
            <Grid2 container spacing={{ xs: 2, sm: 4 }}>
              {appData.map((app, idx) => (
                <Grid2 size={{ xs: 12 }} key={idx}>
                  <AppCard app={app} />
                </Grid2>
              ))}
            </Grid2>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "16px", padding: "8px 16px", color: "#fff", fontWeight: 'bold' }}
              onClick={() => setSelectedTab(1)} // Move to next step
            >
              Next Step
            </Button>
          </Stack>
        )}

        {/* Step 2: Connect Wallet */}
        {selectedTab === 1 && (
          <Stack spacing={{ xs: 2, sm: 4 }} sx={{ alignItems: "center" }}>
            <ConnectWallets />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "16px", padding: "8px 16px", color: "#fff", fontWeight: 'bold' }}
              onClick={() => setSelectedTab(2)} // Move to next step
            >
              Next Step
            </Button>
          </Stack>
        )}

        {/* Step 3: Add Funds */}
        {selectedTab === 2 && (
          <Stack spacing={{ xs: 2, sm: 4 }} sx={{ alignItems: "center" }}>
            <AddFunds />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "16px", padding: "8px 16px", color: "#fff", fontWeight: 'bold' }}
              onClick={() => setSelectedTab(3)} // Move to next step
            >
              Next Step
            </Button>
          </Stack>
        )}

        {/* Step 4: Start Trading */}
        {selectedTab === 3 && (
          <Stack spacing={{ xs: 2, sm: 4 }} sx={{ alignItems: "center" }}>
            <StartTrading />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "16px", padding: "8px 16px", color: "#fff", fontWeight: 'bold' }}
              onClick={() => setSelectedTab(0)} // Optionally loop back to step 1 or finish
            >
              Finish Setup
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default OnboardingPage;
