// @flow

import React from 'react';

import Board from './Board'
import calculateWinner from '../helpers/CalculateWinner'

type Props = {};

type State = {
  history: Array<Object>,
  stepNumber: number,
  xIsNext: boolean
};

class Game extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i: number) {
    const history: Array<Object> = this.state.history.slice(0, this.state.stepNumber + 1);
    const current: Object = history[history.length - 1];
    const squares: Array<string | null> = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render(): React$Element<"div"> {
    const history: Array<Object> = this.state.history;
    const current: Object = history[this.state.stepNumber];
    const winner: null | string = calculateWinner(current.squares);

    const moves: Array<React$Element<"li">> = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} data-testid="game-history-button">{desc}</button>
        </li>
      );
    });

    let status: string;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game" data-testid="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info" data-testid="game-info">
          <div data-testid="game-info-next-player">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
