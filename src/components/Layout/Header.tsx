import { TELEGRAM_URL } from "@/lib/constants/config";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import { AiOutlineDollar } from "react-icons/ai";

const Header: FC = () => {
  return (
    <AppBar position="static" sx={{ background: "rgba(0,0,0,0.8)" }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction={"row"} spacing={1} component={Link} href={"/"} alignItems={'center'}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <AiOutlineDollar />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AurumBot
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={3} alignItems={'center'}>
          <Typography
            component={Link}
            href={"/new-to-crypto"}
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            New To Crypto
          </Typography>
          <Button
            color="inherit"
            variant="contained"
            href={TELEGRAM_URL}
            target="_blank"
            sx={{
              backgroundColor: "#DAA520",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "#fff", fontWeight: "bold" }}
            >
              Join Now
            </Typography>
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
