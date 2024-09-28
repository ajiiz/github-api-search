import { Alert, Snackbar, Typography } from "@mui/material";
import { GridProps } from "@sections/users/components/Grid/Grid.types";
import { GridItems } from "@sections/users/components/Grid/GridItems/GridItems";
import { GridSkeleton } from "@sections/users/components/Grid/GridSkeleton/GridSkeleton";
import { useFetchUsers } from "@sections/users/hooks/useFetchUsers";
import InfiniteScroll from "react-infinite-scroller";

export const Grid = ({ searchValue }: GridProps) => {
  const { users, isFetched, hasNextPage, fetchNextPage, isError, isLoading, snackbar, handleSnackbarClose } = useFetchUsers(searchValue);

  const shouldShowNoResults = users.length === 0 && isFetched && !isError;
  if (shouldShowNoResults) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
        No results found
      </Typography>
    );
  }

  if (isLoading) {
    return <GridSkeleton />;
  }

  return (
    <>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          fetchNextPage();
        }}
        hasMore={!isError && hasNextPage}
        loader={<GridSkeleton />}
      >
        <GridItems users={users} />
      </InfiniteScroll>
      <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
