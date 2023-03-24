import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ListView from "../views/ListView";
import axios from "axios";
import Title from "../components/Title";

jest.mock("axios");

describe("Test component Title", () => {
  it("should render the title", () => {
    render(<Title title="My Title" />);
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });
});

describe("Test View ListView", () => {
  // Mock des données
  const mockUsers = [
    {
      userId: 1,
      id: 1,
      title: "melvin",
      body: "marvin",
    },
  ];
  // Mock de la requête axios
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockUsers });
  });
  it("should render the list of users", async () => {
    render(<ListView />);
    await waitFor(() => {
      // Assertions si le texte est présent
      expect(screen.getByText("melvin")).toBeInTheDocument();
    });
  });

  it("Should simulate a user click", async () => {
    // initialisation d'un user avec userEvent
    // Génération DOM virtuel
    render(<ListView />);
    // Assertions si le texte n'est pas présent
    expect(screen.queryByText("Merci d'avoir cliqué")).not.toBeInTheDocument();
    // Simule un click sur le bouton avec userEvent et attend la fin de l'opération avec await user.click
    await fireEvent.click(screen.getByRole("button"));
    // Assertions si le texte est présent
    expect(screen.getAllByText("Merci d'avoir cliqué")).toHaveLength(1);
  });

  test("Should check if this title exists", () => {
    // Génération DOM virtuel
    render(<ListView />);
    // Assertions si le titre est présent
    expect(screen.getByText("Titre de mon composant")).toBeInTheDocument();
  });
});
