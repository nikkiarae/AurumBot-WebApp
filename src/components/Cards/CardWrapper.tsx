"use client";

import { Card, useTheme } from "@mui/material";
import { FC, PropsWithChildren } from "react";

const CardWrapper: FC<PropsWithChildren> = ({ children }) => {
    const theme = useTheme()
  const borderColor = theme.palette.mode === "dark" ? "#4f4f4f" : "#000000"; 

  return (
    <Card
      elevation={2}
      sx={{
        textAlign: "center",
        padding: {xs: 2, md: 3 },
        borderRadius: 4,
        height: "100%",
        border: `3px solid ${borderColor}`, // Subtle border
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Soft shadow for card elevation
      }}
    >
      {children}
    </Card>
  );
};

export default CardWrapper;