import { GridItem } from "@components/Users/Grid/GridItem/GridItem";
import { GridItemsProps } from "@components/Users/Grid/GridItems/GridItem.types";
import { Grid2 } from "@mui/material";

export const GridItems = ({ users }: GridItemsProps) => {
  return (
    <Grid2 container spacing={6} justifyContent="center">
      {users.map(user => (
        <GridItem key={user.id} user={user} />
      ))}
    </Grid2>
  );
};
