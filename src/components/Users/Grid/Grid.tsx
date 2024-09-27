import { Alert, Grid2, Snackbar, Typography } from "@mui/material";
import { ApiError } from "api/api.helpers";
import { getUsers, QUERY } from "api/users/api.users";
import { getUsersErrors } from "api/users/api.users.errors";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { GridProps } from "./Grid.types";
import { GridItem } from "./GridItem/GridItem";
import { GridSkeleton } from "./GridSkeleton/GridSkeleton";

export const Grid = ({ searchValue }: GridProps) => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "error" | "success";
  }>({
    open: false,
    message: "",
    severity: "error"
  });

  const { data, isFetched, hasNextPage, fetchNextPage, isError } = useInfiniteQuery({
    queryKey: [QUERY.GET_USERS, searchValue],
    queryFn: ({ pageParam = 1 }) => getUsers({ query: searchValue, page: pageParam }),
    enabled: !!searchValue,
    refetchOnWindowFocus: false,
    retry: false,
    getNextPageParam: (lastPage, pages) => {
      const lastPageData = lastPage.data;
      const nextPage = pages.length * 50 + 1;
      return nextPage <= lastPageData.total_count ? nextPage : undefined;
    },
    onError: (error: ApiError) => {
      const message = getUsersErrors(error);
      setSnackbar({ open: true, message, severity: "error" });
    },
    onSuccess: () => {
      setSnackbar({ open: true, message: "Success: Users fetched successfully", severity: "success" });
    }
  });

  const users = data?.pages.flatMap(page => page.data.items) || [];

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "", severity: "error" });
  };

  const shouldShowNoResults = users.length === 0 && isFetched && !isError;
  if (shouldShowNoResults) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
        No results found
      </Typography>
    );
  }

  return (
    <>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          fetchNextPage();
        }}
        hasMore={hasNextPage}
        loader={<GridSkeleton />}
      >
        <Grid2 container spacing={2} justifyContent="center">
          {users.map(user => (
            <GridItem key={user.id} user={user} />
          ))}
        </Grid2>
      </InfiniteScroll>
      <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
