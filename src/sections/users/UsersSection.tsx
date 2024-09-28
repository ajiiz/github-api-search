import { Form } from "@sections/users/components/Form/Form";
import { Grid } from "@sections/users/components/Grid/Grid";
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
