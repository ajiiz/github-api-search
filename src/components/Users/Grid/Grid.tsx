import { GridProps } from "@components/Users/Grid/Grid.types";
import { GridItems } from "@components/Users/Grid/GridItems/GridItems";
import { GridSkeleton } from "@components/Users/Grid/GridSkeleton/GridSkeleton";
import { Alert, Snackbar, Typography } from "@mui/material";
import { ApiError } from "api/api.helpers";
import { getUsers, PAGE_SIZE, QUERY } from "api/api.users";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";

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
      const totalCount = lastPage.data.total_count;
      const nextPage = pages.length + 1;
      const shouldFetchNextPage = nextPage * PAGE_SIZE < totalCount;

      return shouldFetchNextPage ? nextPage : undefined;
    },
    onError: (error: ApiError) => {
      const { message } = error.response.data;
      const { status } = error;
      const errorMessage = `${status}: ${message}`;
      setSnackbar({ open: true, message: errorMessage, severity: "error" });
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
        hasMore={!isError && hasNextPage}
        loader={<GridSkeleton />}
      >
        <GridItems key={1} users={users} />
      </InfiniteScroll>
      <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
