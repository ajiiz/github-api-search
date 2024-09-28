import { Header } from "@components/Header/Header";
import { Container } from "@mui/material";
import { UsersSection } from "@sections/users/UsersSection";

export const Layout = () => {
  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
      <Header />
      <UsersSection />
    </Container>
  );
};
