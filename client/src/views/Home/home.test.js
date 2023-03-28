import { render, screen} from "@testing-library/react";
import Home from "../Home/index";
import { getDatabase, createDatabase, deleteDatabase } from "../../libs/utils";

describe("Test View Home", () => {
  //Test si le call api retourne un 200
  test("should return a 200 status code", async () => {
    const res = await getDatabase();
    expect(res.status).toBe(200);
  });

  // Test si il a cree une nouvelle database
  it("creates a new database", async () => {
    const res = await createDatabase(`/test`, "test", []);
    expect(res.status).toBe(201);
  });

  // Test si il a supprimer une database
  it("delete a database", async () => {
    const res = await deleteDatabase("test");
    expect(res.status).toBe(200);
  });

  // Test si la page contient le titre "DATABASE" et les labels "Nom" "Voir" "Delete"
  it("Should check if this title exists", () => {
    // Génération DOM virtuel
    render(<Home />);
    // Assertions si cette chaine de caratère est présent dans le html
    expect(screen.getByText("DATABASE")).toBeInTheDocument();
    expect(screen.getByText("Nom")).toBeInTheDocument();
    expect(screen.getByText("Voir")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
});
