// @flow

import React from 'react';
import ReactDOM from 'react-dom';

type Props = {
  value: number
};

type State = {
  value: ?string
};

class Square extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      value: null
    };
  }

  render(): React$Element<"button"> {
    const {
      value,
    } = this.state;

    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}
      >
        {value}
      </button>
    );
  }
}

export default Square;
