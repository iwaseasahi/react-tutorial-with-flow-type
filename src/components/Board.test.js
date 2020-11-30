import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";

import Board from './Board';

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
  const squares = Array(9).fill(null)
  const onClick = jest.fn();
  render(<Board squares={squares} onClick={onClick} />, container)
});

it('renders with a value and onClick', () => {
  let squares = Array(9).fill(null);
  squares[0] = "X";
  squares[1] = "◯";
  const onClick = jest.fn();
  act(() => {
    render(<Board squares={squares} onClick={onClick} />, container)
  });

  const board = document.querySelector("[data-testid=board]");
  expect(board.textContent).toBe("X◯");
});
