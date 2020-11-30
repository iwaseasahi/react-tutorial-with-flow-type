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
  const mockFn = jest.fn(i => i);
  render(<Square value="X" onClick={mockFn} />, container);
});

it("renders with a value and onClick", () => {
  const mockFn = jest.fn(i => i);
  act(() => {
    render(<Square value="X" onClick={mockFn} />, container);
  });
  expect(container.textContent).toBe("X");
});

it("renders with onClick and without a value", () => {
  const mockFn = jest.fn(i => i);
  act(() => {
    render(<Square onClick={mockFn} />, container);
  });
  expect(container.textContent).toBe("");
});

it("can do onClick", () => {
  const onClick = jest.fn();
  act(() => {
    render(<Square onClick={onClick} />, container);
  });

  const button = document.querySelector("[data-testid=button]");
  expect(button.innerHTML).toBe("");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onClick).toHaveBeenCalledTimes(1);

  act(() => {
    for (let i = 0; i < 5; i++) {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  expect(onClick).toHaveBeenCalledTimes(6);
});
