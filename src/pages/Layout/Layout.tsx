import { UsersSection } from "@components/Users/UsersSection";
import { Header } from "@components/common/Header/Header";
import { Container } from "@mui/material";

export const Layout = () => {
  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
      <Header />
      <UsersSection />
    </Container>
  );
};
