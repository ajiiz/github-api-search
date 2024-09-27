import { Typography } from "@mui/material";
import { HeaderProps } from "./Header.types";

export const Header = ({ title = "Welcome to the Github User Search", description = "Enter a username to search for a user" }: HeaderProps) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {description}
      </Typography>
    </>
  );
};
