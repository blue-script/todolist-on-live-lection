import React from 'react';

type ButtonPropsType = {
  name: string
}

const Button: React.FC<ButtonPropsType> = (props) => {
  return (
      <button>
        {props.name}
      </button>
  );
};

export default Button;