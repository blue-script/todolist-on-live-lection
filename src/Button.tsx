import React from 'react';

type ButtonPropsType = {
  name: string
  onClickHandler: () => void
  disabled?: boolean
}

const Button: React.FC<ButtonPropsType> = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClickHandler}>
      {props.name}
    </button>
  );
};

export default Button;