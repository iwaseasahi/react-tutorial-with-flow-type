import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";

import Square from './Square';

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
  const onClick = jest.fn();
  render(<Square value="X" onClick={onClick} />, container);
});

it("renders with a value and onClick", () => {
  const onClick = jest.fn();
  act(() => {
    render(<Square value="X" onClick={onClick} />, container);
  });
  expect(container.textContent).toBe("X");
});

it("renders with onClick and without a value", () => {
  const onClick = jest.fn();
  act(() => {
    render(<Square onClick={onClick} />, container);
  });
  expect(container.textContent).toBe("");
});

it("can do onClick", () => {
  const onClick = jest.fn();
  act(() => {
    render(<Square onClick={onClick} />, container);
  });

  const square = document.querySelector("[data-testid=square]");
  expect(square.innerHTML).toBe("");

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
