import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Table from "./index";
import { getTable, createTable, deleteTable } from "../../libs/utils";

describe("Test View Details", () => {
  test("Should check if this title exists", () => {
    // Génération DOM virtuel
    render(<Table />);
    // Assertions si le titre est présent
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });
});
