import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Details from "./index";
import axios from "axios";

describe("Test View Details", () => {
  // Mock des données

  test("Should check if this title exists", () => {
    // Génération DOM virtuel
    render(<Details />);
    // Assertions si le titre est présent
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });
});
