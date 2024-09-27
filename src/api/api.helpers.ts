import { axiosClient } from "./api.service";

export type ApiError = Error & { status: number; data: { errorCode: string } };

export const STATUS = {
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  internalServerError: 500
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRequest = async <T>(url: string, params?: any) => {
  const response = await axiosClient.get<T>(url, { params });
  return response;
};
