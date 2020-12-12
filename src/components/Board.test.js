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

it("can do onClick", () => {
  let squares = Array(9).fill(null);
  squares[0] = "X";
  const onClick = jest.fn();
  act(() => {
    render(<Board squares={squares} onClick={onClick} />, container)
  });

  const square = document.querySelector("[data-testid=square]");
  expect(square.innerHTML).toBe("X");

  act(() => {
    square.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onClick).toHaveBeenCalledTimes(1);

  act(() => {
    for (let i = 0; i < 5; i++) {
      square.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  expect(onClick).toHaveBeenCalledTimes(6);
});
