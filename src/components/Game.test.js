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
  expect(gameInfo.innerHTML).toBe("Next player: O");

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

it('shows winner X', () => {
  act(() => {
    render(<Game />, container)
  });

  const firstSquares = document.querySelector("[data-testid=board-row-first]").children;
  const secondSquares = document.querySelector("[data-testid=board-row-second]").children;
  const thirdSquares = document.querySelector("[data-testid=board-row-third]").children;

  act(() => {
    firstSquares[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  act(() => {
    firstSquares[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  act(() => {
    secondSquares[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  act(() => {
    secondSquares[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  act(() => {
    thirdSquares[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  act(() => {
    thirdSquares[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const gameInfo = document.querySelector("[data-testid=game-info-next-player]");
  expect(gameInfo.innerHTML).toBe("Winner: X");
});
