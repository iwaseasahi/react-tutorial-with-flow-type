// @flow

import React from 'react';
import ReactDOM from 'react-dom';

type Props = {
  value: number
};

class Square extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React$Element<"button"> {
    const {
      value,
    } = this.props;

    return (
      <button className="square">
        {value}
      </button>
    );
  }
}

export default Square;
