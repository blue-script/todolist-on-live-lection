import React, {ChangeEvent} from 'react';
import {Checkbox, CheckboxProps} from '@mui/material';
import {TaskType} from '../Todolist';

type CheckBoxProps = {
  isDone: boolean
  callBack: (isDone: boolean) => void
}

export const CheckBox: React.FC<CheckBoxProps>= (props) => {
const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  props.callBack(e.currentTarget.checked)
}
  return (
    <div>
      <Checkbox
        checked={props.isDone}
        color="primary"
        onChange={onChangeHandler}
      />
    </div>
  );
};