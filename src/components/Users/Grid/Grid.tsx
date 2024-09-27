import { Alert, Avatar, Container, Grid2, Skeleton, Snackbar, Typography } from "@mui/material";
import { ApiError } from "api/api.helpers";
import { getUsers, QUERY } from "api/users/api.users";
import { getUsersErrors } from "api/users/api.users.errors";
import { useState } from "react";
import { isError, useQuery } from "react-query";
import { GridProps } from "./Grid.types";

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

  const { data, isLoading, isFetched } = useQuery({
    queryKey: [QUERY.GET_USERS, searchValue],
    queryFn: () => getUsers({ query: searchValue }),
    enabled: !!searchValue,
    refetchOnWindowFocus: false,
    retry: false,
    onError: (error: ApiError) => {
      const message = getUsersErrors(error);
      setSnackbar({ open: true, message, severity: "error" });
    },
    onSuccess: () => {
      setSnackbar({ open: true, message: "Success: Users fetched successfully", severity: "success" });
    }
  });
  const users = data?.data?.items || [];

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
      <Grid2 container spacing={2} justifyContent="center">
        {isLoading
          ? Array.from(new Array(3)).map((_, index) => (
              <Grid2 key={index} component={Container} sx={{ textAlign: "center" }} size={{ xs: 12, sm: 4 }}>
                <Skeleton variant="circular" width={80} height={80} />
                <Skeleton variant="text" sx={{ mt: 2, mb: 1 }} />
              </Grid2>
            ))
          : users.map(user => (
              <Grid2 key={user.id} component={Container} sx={{ textAlign: "center" }} size={{ xs: 12, sm: 4 }}>
                <Avatar alt={user.login} src={user.avatar_url} sx={{ width: 80, height: 80, margin: "0 auto" }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {user.login}
                </Typography>
              </Grid2>
            ))}
      </Grid2>
      <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
