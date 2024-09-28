import { Page } from "@sections/users/components/Grid/Grid.types";
import { UserData } from "@sections/users/components/Grid/GridItem/GridItem.types";
import { ApiError } from "api/api.helpers";
import { getUsers, PAGE_SIZE, QUERY } from "api/api.users";
import { useInfiniteQuery } from "react-query";
import { useSnackbar } from "./useSnackbar";

export const useFetchUsers = (searchValue: string) => {
  const { snackbar, showSnackbar, handleSnackbarClose } = useSnackbar();

  const { data, isFetched, hasNextPage, fetchNextPage, isError, isLoading } = useInfiniteQuery({
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
      const errorMessage = `${error.status}: ${error.response.data.message}`;
      showSnackbar(errorMessage, "error");
    },
    onSuccess: () => {
      showSnackbar("Success: Users fetched successfully", "success");
    }
  });

  // INFO: Functional programming technique:
  // A pure function and flatMap that extracts the items from the pages
  const getUserItems = (pages: Page[] = []): UserData[] => pages.flatMap(page => page.data.items);

  const users = getUserItems(data?.pages);

  return {
    users,
    isFetched,
    hasNextPage,
    fetchNextPage,
    isError,
    isLoading,
    snackbar,
    handleSnackbarClose
  };
};
