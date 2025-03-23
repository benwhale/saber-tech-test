import { render, screen, fireEvent } from "@testing-library/react";
import UrlForm from "@/components/UrlForm";

describe("UrlForm", () => {
  const mockHandleSubmit = jest.fn();
  const mockSetUrl = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input and button", () => {
    render(
      <UrlForm
        handleSubmit={mockHandleSubmit}
        url=""
        setUrl={mockSetUrl}
        loading={false}
      />
    );

    expect(
      screen.getByPlaceholderText("Enter URL to shorten")
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Shorten URL");
  });

  it("shows loading state", () => {
    render(
      <UrlForm
        handleSubmit={mockHandleSubmit}
        url=""
        setUrl={mockSetUrl}
        loading={true}
      />
    );

    expect(screen.getByRole("button")).toHaveTextContent("Shortening...");
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls setUrl when typing", () => {
    render(
      <UrlForm
        handleSubmit={mockHandleSubmit}
        url=""
        setUrl={mockSetUrl}
        loading={false}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter URL to shorten"), {
      target: { value: "https://example.com" },
    });

    expect(mockSetUrl).toHaveBeenCalledWith("https://example.com");
  });
});
