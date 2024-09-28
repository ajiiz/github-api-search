import { Header } from "@components/common/Header/Header";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Header Component", () => {
  const title = "Custom Title";
  const description = "Custom Description";

  it("should render with default props", () => {
    render(<Header />);

    expect(screen.getByText("Welcome to the Github User Search")).toBeInTheDocument();
    expect(screen.getByText("Enter a username to search for a user")).toBeInTheDocument();
  });

  it("should render with custom props", () => {
    render(<Header title={title} description={description} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
