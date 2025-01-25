"use client";

import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Container,
  Tabs,
  Tab,
  Grid2,
} from "@mui/material";
import AppCard from "@/components/Cards/AppCard";
import { App } from "@/types/general";

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
    androidLink: "https://play.google.com/store/apps/details?id=com.phantom.app", // Android Google Play link
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
    androidLink: "https://play.google.com/store/apps/details?id=org.telegram.messenger", // Android Google Play link
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
    androidLink: "https://play.google.com/store/apps/details?id=com.dexscreener.dexscreener", // Android Google Play link
    link: "https://www.example.com",
  },
];

const OnboardingPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      {/* Page Title */}
      <Box sx={{ textAlign: "center", pb: 2 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#fff" }}
        >
          Getting Started with Crypto
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          gutterBottom
          sx={{ margin: "10px 0", color: "#fff" }}
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
        <Tab label="Start Trading" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ paddingTop: "20px" }}>
        {/* Step 1: Download Apps */}
        {selectedTab === 0 && (
          <Grid2 container spacing={4}>
            {appData.map((app, idx) => (
              <Grid2 size={{ xs: 12 }} key={idx}>
                <AppCard app={app} />
              </Grid2>
            ))}
          </Grid2>
        )}

        {/* Step 2: Connect Wallet */}
        {selectedTab === 1 && (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              Connect Your Phantom Wallet
            </Typography>
            <Typography variant="body1" paragraph>
              Open your Phantom Wallet and connect it to your Dexscreener
              account to begin trading.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "16px", padding: "8px 16px" }}
              onClick={() => setSelectedTab(2)} // Move to next step
            >
              Next Step
            </Button>
          </Box>
        )}

        {/* Step 3: Start Trading */}
        {selectedTab === 2 && (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              Start Trading on Dexscreener
            </Typography>
            <Typography variant="body1" paragraph>
              Now that your wallet is connected, you can start trading. Use
              Dexscreener to track coins and tokens.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "16px", padding: "8px 16px" }}
              onClick={() => setSelectedTab(0)} // Optionally loop back to step 1 or finish
            >
              Finish Setup
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default OnboardingPage;
