"use client";

import { TELEGRAM_URL } from "@/lib/constants/config";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Stack,
  useMediaQuery,
  Drawer,
  Divider,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { FC, useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";

const Header: FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Check if the screen size is small (mobile view)
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  // Toggle the Drawer
  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static" sx={{ background: "rgba(0,0,0,0.8)" }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left Side (Logo and Name) */}
          <Stack direction={"row"} spacing={1} alignItems={'center'} component={Link} href={'/'} onClick={() => toggleDrawer(false)}>
                <Image
                src="/assets/logo.png"  // Path to logo image in public/assets
                alt="AurumBot Logo"
                width={35}
                height={35}
              />
              <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                AurumBot
              </Typography>
          </Stack>

          {/* Right Side (Menu items and Join Button) */}
          {isSmallScreen ? (
            // Hamburger menu for small screens
            <IconButton color="inherit" onClick={() => toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            // Regular Menu for larger screens
            <Stack direction={"row"} spacing={3} alignItems={'center'}>
              <Typography
                component={Link}
                href={"/new-to-crypto"}
                variant="body1"
                sx={{ flexGrow: 1 }}
              >
                New To Crypto
              </Typography>
              <Button
                color="primary"
                variant="contained"
                href={TELEGRAM_URL}
                target="_blank"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                Join Now
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Small Screens */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Stack spacing={2} sx={{
          p: 2
        }}>

        
        <Stack component={Link} direction={"row"} alignItems="center" spacing={1} href={'/'} onClick={() => toggleDrawer(false)} >
          <Image
            src="/assets/logo.png"
            alt="AurumBot Logo"
            height={35}
            width={35}
          />
          <Typography variant="h6" color={'text.primary'} sx={{ fontWeight: "bold" }}>
            AurumBot
          </Typography>
        </Stack>
        <Divider />
          <Typography gutterBottom variant={'body1'} onClick={() => toggleDrawer(false)} component={Link} href={"/new-to-crypto"} sx={{ textAlign: 'center '}}>
            New To Crypto
          </Typography>
          <Button variant={'contained'} onClick={() => toggleDrawer(false)} href={TELEGRAM_URL} target="_blank" sx={{ color: "#fff", fontWeight: "bold" }}>
            Join Now
          </Button>
        </Stack>
      </Drawer>
    </>
  );
};

export default Header;