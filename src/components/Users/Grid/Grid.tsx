import { Avatar, Container, Grid2, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import { GridProps } from "./Grid.types";

export const Grid = ({ searchValue }: GridProps) => {
  const gridItems = [
    { id: 1, name: "John Doe", avatarUrl: "https://via.placeholder.com/150" },
    { id: 2, name: "Jane Smith", avatarUrl: "https://via.placeholder.com/150" },
    { id: 3, name: "Alex Johnson", avatarUrl: "https://via.placeholder.com/150" },
    { id: 4, name: "John Doe", avatarUrl: "https://via.placeholder.com/150" },
    { id: 5, name: "Jane Smith", avatarUrl: "https://via.placeholder.com/150" },
    { id: 6, name: "Alex Johnson", avatarUrl: "https://via.placeholder.com/150" }
  ];

  const [loading, setLoading] = useState(true);

  setTimeout(() => setLoading(false), 2000);

  console.log(searchValue);

  return (
    <Grid2 container spacing={2} justifyContent="center">
      {loading
        ? Array.from(new Array(3)).map((_, index) => (
            <Grid2 key={index} component={Container} sx={{ textAlign: "center" }} size={{ xs: 12, sm: 4 }}>
              <Skeleton variant="circular" width={80} height={80} />
              <Skeleton variant="text" sx={{ mt: 2, mb: 1 }} />
            </Grid2>
          ))
        : gridItems.map(item => (
            <Grid2 key={item.id} component={Container} sx={{ textAlign: "center" }} size={{ xs: 12, sm: 4 }}>
              <Avatar alt={item.name} src={item.avatarUrl} sx={{ width: 80, height: 80, margin: "0 auto" }} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                {item.name}
              </Typography>
            </Grid2>
          ))}
    </Grid2>
  );
};
