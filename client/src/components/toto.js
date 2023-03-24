import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListView from "../views/ListView";

const mockComposantListe = jest.fn();
jest.mock("../components/Title", () => (props) => {
  mockComposantListe(props);
  return <mock-liste role="composant-liste" />;
});

describe("Test composant ListView", () => {
  test("composant enfant", () => {
    render(<ListView />);
    expect(mockComposantListe).toHaveBeenCalledTimes(1);
    expect(mockComposantListe.mock.calls[0][0].title).toBe("titre de la liste");
  });
  it("click sur le button", async () => {
    // initialisation d'un user avec userEvent
    const user = userEvent.setup();
    // Génération DOM virtuel
    render(<ListView />);
    // Assertions si le texte n'est pas présent
    expect(screen.queryByText("Merci d'avoir cliqué")).not.toBeInTheDocument();
    // Simule un click sur le bouton avec userEvent et attend la fin de l'opération avec await user.click
    await fireEvent.click(screen.getByRole("button"));
    // Assertions si le texte est présent
    expect(screen.getAllByText("Merci d'avoir cliqué")).toHaveLength(1);
  });

  test("should render", () => {
    // Génération DOM virtuel
    render(<ListView />);
    // Assertions si le titre est présent
    expect(screen.getByText("Titre de mon composant")).toBeInTheDocument();
  });
});
