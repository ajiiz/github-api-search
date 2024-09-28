import { Grid2 } from "@mui/material";
import { GridItem } from "@sections/users/components/Grid/GridItem/GridItem";
import { GridItemsProps } from "@sections/users/components/Grid/GridItems/GridItem.types";

export const GridItems = ({ users }: GridItemsProps) => {
  return (
    <Grid2 container spacing={6} justifyContent="center">
      {users.map(user => (
        <GridItem key={user.id} user={user} />
      ))}
    </Grid2>
  );
};
