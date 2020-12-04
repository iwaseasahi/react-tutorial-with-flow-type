// @flow

import React from 'react';

import Square from './Square'
import calculateWinner from '../helpers/CalculateWinner'

type Props = {
  squares: Array<string | null>,
  onClick: (i: number) => void
};

class Board extends React.Component<Props> {
  renderSquare(i: number): React$Element<typeof Square> {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render(): React$Element<"div"> {
    return (
      <div data-testid="board">
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
