import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Table from "./index";
import axios from "axios";

describe("Test View Details", () => {
  // Mock des données

  test("Should check if this title exists", () => {
    // Génération DOM virtuel
    render(<Table />);
    // Assertions si le titre est présent
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });
});
