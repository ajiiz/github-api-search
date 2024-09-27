import { Form } from "@components/Users/Form/Form";
import { Grid } from "@components/Users/Grid/Grid";
import { useState } from "react";

export const UsersSection = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Form handleSearchChange={value => setSearchValue(value)} />
      <Grid searchValue={searchValue} />
    </>
  );
};
