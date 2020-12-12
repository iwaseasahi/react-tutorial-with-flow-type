// @flow

import React from 'react';

type Props = {
  value: string | null,
  onClick: () => void
};

function Square(props: Props): React$Element<"button"> {
  return (
    <button
      className="square"
      onClick={props.onClick}
      data-testid="square"
    >
      {props.value}
    </button>
  );
}

export default Square;
