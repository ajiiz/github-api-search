import { getRequest } from "../api.helpers";
import { UsersSearch } from "../api.types";

const PATH = "/search/users";

export const QUERY = {
  GET_USERS: "GET_USERS"
};

export const getUsers = ({ query, page }: { query: string; page: string }) => {
  return getRequest<UsersSearch>(`${PATH}`, { q: query, page, per_page: "50" });
};
