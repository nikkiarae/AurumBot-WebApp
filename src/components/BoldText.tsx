import { Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { FC } from "react";

interface RenderTextProps {
  text: string;
  variant: Variant;
}

const RenderText: FC<RenderTextProps> = ({ text, variant }) => {
  return (
    <Typography 
      component="span" 
      sx={{ fontWeight: "bold" }} 
      variant={variant}
    >
      {text}
    </Typography>
  );
};

export default RenderText;
