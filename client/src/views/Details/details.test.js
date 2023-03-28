import { render, screen } from "@testing-library/react";
import Details from "./index";
import { getData } from "../../libs/utils";

describe("Test View Details", () => {
  // Test si le call api retourne un 400
  test("should return a 400 status code for data", async () => {
    const res = await getData();
    expect(res.status).toBe(400);
  });

  // Test si la page contient le titre "Filter"
  test("Should check if this title exists", () => {
    // Génération DOM virtuel
    render(<Details />);
    // Assertions si le titre est présent
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });
});
