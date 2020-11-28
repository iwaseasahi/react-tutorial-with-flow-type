// @flow

import React from 'react';

type Props = {
  value: ?string,
  onClick: () => void
};

function Square(props: Props): React$Element<"button"> {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
