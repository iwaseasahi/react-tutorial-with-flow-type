import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";

import Game from './Game';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders without crashing', () => {
  render(<Game />, container)
});

it('do handleClick', () => {
  act(() => {
    render(<Game />, container)
  });

  const square = document.querySelector("[data-testid=square]");
  expect(square.innerHTML).toBe("");

  act(() => {
    square.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(square.innerHTML).toBe("X");

  const gameInfo = document.querySelector("[data-testid=game-info-next-player]");
  expect(gameInfo.innerHTML).toBe("Next player: O")

  const gameHistory = document.querySelector("[data-testid=game-info-next-player]");
});

it('goes to game start', () => {
  act(() => {
    render(<Game />, container)
  });

  const square = document.querySelector("[data-testid=square]");

  act(() => {
    square.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const go_to_game_start = document.querySelector("[data-testid=game-history-button]");
  expect(go_to_game_start.textContent).toBe("Go to game start")

  act(() => {
    go_to_game_start.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(square.innerHTML).toBe("");
});
