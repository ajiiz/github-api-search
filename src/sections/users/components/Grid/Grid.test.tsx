import { render, screen, waitFor } from "@testing-library/react";
import { getUsers } from "api/api.users";
import { QueryClient, QueryClientProvider } from "react-query";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { Grid } from "./Grid";

vi.mock("api/api.users", () => {
  return {
    getUsers: vi.fn(),
    QUERY: { GET_USERS: "GET_USERS" },
    PAGE_SIZE: 50
  };
});

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactElement) => {
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe("Grid Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render no results message when there are no users", async () => {
    (getUsers as Mock).mockResolvedValueOnce({
      data: { total_count: 0, items: [] }
    });

    renderWithQueryClient(<Grid searchValue="test" />);

    await waitFor(() => {
      expect(screen.getByText("No results found")).toBeInTheDocument();
    });
  });

  it("should render users when data is fetched successfully", async () => {
    (getUsers as Mock).mockResolvedValueOnce({
      data: { total_count: 1, items: [{ id: 1, login: "testuser" }] }
    });

    renderWithQueryClient(<Grid searchValue="test" />);

    await waitFor(() => {
      expect(screen.getByText("testuser")).toBeInTheDocument();
    });
  });

  it("should display error message when there is an error", async () => {
    const error = {
      response: { data: { message: "Not Found" } },
      status: 404
    };

    (getUsers as Mock).mockRejectedValueOnce(error);

    renderWithQueryClient(<Grid searchValue="test" />);

    await waitFor(() => {
      expect(screen.getByText("404: Not Found")).toBeInTheDocument();
    });
  });
});
