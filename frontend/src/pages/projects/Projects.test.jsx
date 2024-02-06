import { MemoryRouter } from "react-router-dom";
import Projects from "./Projects";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import styles from "./Projects.module.css";

describe("Projects", () => {
  it('should return a div element with the text "Projects"', () => {
    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: "My projects" })
    ).toBeInTheDocument();
  });

  it("should render an element with the text Todo ", () => {
    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>
    );
    expect(screen.getByText("Todo List")).toBeInTheDocument();
  });

  it("should render an element with the text Blog ", () => {
    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>
    );
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });

  it("should render a section with the class styles.section", () => {
    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>
    );

    const section = screen.getByTestId("section");
    expect(section).toHaveClass(styles.section);
  });
});
