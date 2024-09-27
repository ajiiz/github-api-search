import { ApiError } from "api/api.helpers";

export const getUsersErrors = (error: ApiError) => {
  switch (error.status) {
    case 304:
      return "Not Modified: The data has not changed.";
      break;
    case 422:
      return "Unprocessable Entity: Validation failed, or the endpoint has been spammed.";
      break;
    case 503:
      return "Service Unavailable: The server is currently unavailable. Please try again later.";
      break;
    default:
      return "An unexpected error occurred.";
  }
};
