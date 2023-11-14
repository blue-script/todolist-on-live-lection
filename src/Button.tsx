import React from 'react';

type ButtonPropsType = {
  name: string
  onClickHandler: () => void
}

const Button: React.FC<ButtonPropsType> = (props) => {
  return (
      <button onClick={props.onClickHandler}>
        {props.name}
      </button>
  );
};

export default Button;