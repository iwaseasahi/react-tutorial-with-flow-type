// @flow

import React from 'react';
import ReactDOM from 'react-dom';

type Props = {
  value: ?string,
  onClick: () => void
};

class Square extends React.Component<Props> {
  render(): React$Element<"button"> {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

export default Square;
