import { Form } from "@sections/users/components/Form/Form";
import { FormProps } from "@sections/users/components/Form/Form.types";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useDebounce } from "@utils/hooks/useDebounce/useDebounce";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

vi.mock("@utils/hooks/useDebounce/useDebounce", () => ({
  useDebounce: vi.fn()
}));

describe("Form Component", () => {
  const handleSearchChange = vi.fn();

  const renderForm = (props: Partial<FormProps> = {}) => {
    return render(<Form handleSearchChange={handleSearchChange} {...props} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the form with the input field", () => {
    renderForm();

    expect(screen.getByLabelText("Enter the username")).toBeInTheDocument();
  });

  it("should display validation error when input is invalid", async () => {
    renderForm();

    const input = screen.getByLabelText("Enter the username");
    fireEvent.change(input, { target: { value: "--" } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.getByText("Invalid username format")).toBeInTheDocument();
    });
  });

  it("should call handleSearchChange with debounced value", async () => {
    const debounceValue = "tesstuser";
    (useDebounce as Mock).mockReturnValue(debounceValue);

    renderForm();

    const input = screen.getByLabelText("Enter the username");
    fireEvent.change(input, { target: { value: debounceValue } });

    await waitFor(() => {
      expect(handleSearchChange).toHaveBeenCalledWith(debounceValue);
    });
  });

  it("should not call handleSearchChange if there are validation errors", async () => {
    const debounceValue = "";
    (useDebounce as Mock).mockReturnValue(debounceValue);

    renderForm();

    const input = screen.getByLabelText("Enter the username");
    fireEvent.change(input, { target: { value: debounceValue } });

    await waitFor(() => {
      expect(handleSearchChange).not.toHaveBeenCalled();
    });
  });
});
