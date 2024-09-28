import { UserData } from "./GridItem/GridItem.types";

export type GridProps = {
  searchValue: string;
};

export type Page = {
  data: {
    items: UserData[];
    total_count: number;
  };
};
