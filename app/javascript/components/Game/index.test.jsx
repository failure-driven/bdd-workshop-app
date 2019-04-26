import React from "react";
import { render, cleanup } from "react-testing-library";
import Game from ".";
import useProfile from "../../hooks/useProfile";
import { MemoryRouter, Redirect } from "react-router-dom";
import "jest-dom/extend-expect";

jest.mock("../../hooks/useProfile");
jest.mock("../../components/Profile/GameProfile", () =>
  jest.fn(({ profile }) => (
    <div profile={profile} data-testid="mock-game-profile" />
  ))
);

describe("Game", () => {
  beforeEach(() => {
    cleanup();
    useProfile.mockReset();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip("redirects if there is no profile", () => {
    useProfile.mockImplementation(() => ({
      profile: undefined,
      loading: false
    }));
    render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );
    expect(Redirect).toHaveBeenCalledWith({ to: "/hi" });
  });

  it("renders coming soon if a user with a profile renders the page", () => {
    useProfile.mockImplementation(() => ({ profile: { id: "abc-123" } }));
    const { getByTestId } = render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );
    expect(getByTestId("game")).toHaveTextContent("coming soon");
  });

  it("renders loading spinner if loading true", () => {
    useProfile.mockImplementation(() => ({
      profile: { id: "abc-123" },
      loading: true
    }));
    const { queryByTestId, getByText } = render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );
    expect(queryByTestId("game")).toBeNull();
    expect(getByText("Loading...")).toBeTruthy();
  });

  it("renders GameProfile", () => {
    useProfile.mockImplementation(() => ({
      profile: { id: "abc-123", percentComplete: 100 },
      loading: false
    }));
    const { queryByTestId } = render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );
    expect(queryByTestId("mock-game-profile")).toBeTruthy();
    expect(queryByTestId("mock-game-profile")).toMatchInlineSnapshot(`
      <div
        data-testid="mock-game-profile"
        profile="[object Object]"
      />
    `);
  });
});
