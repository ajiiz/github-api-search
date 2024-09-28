import { GridItem } from "@sections/users/components/Grid/GridItem/GridItem";
import { GridItemProps } from "@sections/users/components/Grid/GridItem/GridItem.types";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("GridItem Component", () => {
  const user: GridItemProps["user"] = {
    id: 1,
    login: "testuser",
    avatar_url: "https://example.com/avatar.jpg"
  };

  it("should render the user avatar", () => {
    render(<GridItem user={user} />);
    const avatar = screen.getByAltText("testuser");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("should render the user login", () => {
    render(<GridItem user={user} />);
    const login = screen.getByText("testuser");
    expect(login).toBeInTheDocument();
  });
});
