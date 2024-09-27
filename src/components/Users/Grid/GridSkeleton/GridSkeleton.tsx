import { Container, Grid2, Skeleton } from "@mui/material";

export const GridSkeleton = () => {
  return (
    <Grid2 container spacing={2} justifyContent="center">
      {Array.from(new Array(3)).map((_, index) => (
        <Grid2 key={index} component={Container} sx={{ textAlign: "center" }} size={{ xs: 12, sm: 4 }}>
          <Skeleton variant="circular" width={80} height={80} />
          <Skeleton variant="text" sx={{ mt: 2, mb: 1 }} />
        </Grid2>
      ))}
    </Grid2>
  );
};
