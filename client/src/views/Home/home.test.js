import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../Home/index";
import { getDatabase, createDatabase} from "../../libs/utils";


describe("Test View Home", () => {

  it("should return a 200 status code", async () => {
    const res = await getDatabase();
    expect(res.status).toBe(200);
  });

  it("creates a new database", async () => {
    const res = await createDatabase(1, "test", []);
    expect(res.status).toBe(201);
  });

  // it("creates a new database", async () => {
  //   const mockDatabase = [{ id: 1, name: "Database 1", table: [] }];
  //   axios.get.mockResolvedValue({ data: mockDatabase });
  //   axios.post.mockResolvedValue({ data: {} });

  //   render(<Home />);

  //   const input = screen.getByPlaceholderText("Create name database");
  //   fireEvent.change(input, { target: { value: "New Database" } });

  //   const createButton = screen.getByText("Create");
  //   fireEvent.click(createButton);

  //   await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  //   expect(axios.post).toHaveBeenCalledWith("http://localhost:8080", {
  //     id: mockDatabase.length + 1,
  //     name: "New Database",
  //     table: [],
  //   });

  //   await waitFor(() =>
  //     expect(window.location.reload).toHaveBeenCalledTimes(1)
  //   );
  // });

  it("Should check if this title exists", () => {
    // Génération DOM virtuel
    render(<Home />);
    // Assertions si cette chaine de caratère est présent dans le html
    expect(screen.getByText("DATABASE")).toBeInTheDocument();
  });
});