export type UserData = {
  id: number;
  login: string;
  avatar_url: string;
};

export type GridItemProps = {
  user: UserData;
};
