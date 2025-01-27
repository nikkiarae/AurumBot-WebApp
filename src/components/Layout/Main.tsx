"use client";

import React, { FC, ReactNode } from "react";
import { Container, Box } from "@mui/material";

interface MainProps {
  children: ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
  return (
    <Box component="main" py={{ xs: 6, md: 10 }} sx={{ flexGrow: 2 }}>
      <Container sx={{ height: "100%" }}>{children}</Container>
    </Box>
  );
};

export default Main;