// Header.test.jsx
import Header from "./Header";
import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

it("should render a navigation bar with a logo, hamburger button, and menu items", async () => {
  // Arrange
  render(
    <MemoryRouter>
      <Header width={200} />
    </MemoryRouter>
  );
  const logo = screen.getByTestId("logo");
  const button = screen.getByTestId("hamburger-button");
  await userEvent.click(button);
  const menu = screen.getByTestId("menu");

  // Act

  // Assert
  expect(menu).toBeInTheDocument();
  expect(logo).toBeInTheDocument();
});
