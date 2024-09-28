import { GridItemProps } from "@components/Users/Grid/GridItem/GridItem.types";
import { Avatar, Container, Grid2, Typography } from "@mui/material";

export const GridItem = ({ user }: GridItemProps) => {
  const { login, avatar_url } = user;

  return (
    <Grid2 component={Container} sx={{ textAlign: "center" }} size={{ xs: 12, sm: 4 }}>
      <Avatar alt={login} src={avatar_url} sx={{ width: 80, height: 80, margin: "0 auto" }} />
      <Typography variant="h6" sx={{ mt: 2, wordBreak: "break-word" }}>
        {user.login}
      </Typography>
    </Grid2>
  );
};
