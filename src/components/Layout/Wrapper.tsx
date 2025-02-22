"use client";

import React, { FC, ReactNode } from "react";
import { CssBaseline, ThemeProvider, useMediaQuery, responsiveFontSizes, Box } from "@mui/material";
import { darkTheme } from "@/styles/darkTheme";
import { lightTheme } from "@/styles/lightTheme";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  // Detect user's system preference for dark or light mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Apply the theme based on the user's preference
  const theme = prefersDarkMode ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <CssBaseline /> {/* This applies the theme styles globally */}
      <Box display="flex" flexDirection={'column'} sx={{height: '100%'}}>
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default Wrapper;
