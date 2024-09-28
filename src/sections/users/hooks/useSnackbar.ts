import { useState } from "react";

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "error" | "success";
  }>({
    open: false,
    message: "",
    severity: "error"
  });

  const showSnackbar = (message: string, severity: "error" | "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => setSnackbar(prev => ({ ...prev, open: false }));

  return { snackbar, showSnackbar, handleSnackbarClose };
};
