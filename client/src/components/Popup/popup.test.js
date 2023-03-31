import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Popup from "./Popup";

describe("Test component Title", () => {
  it("should render the title", () => {
    render(<Popup title="My Title" color="#04aa6d" />);
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });
});
