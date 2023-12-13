import {IconButton, TextField} from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Addchart, Delete} from '@mui/icons-material';

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

  let [title, setTitle] = useState('')
  let [error, setError] = useState<string | null>(null)

  const addItem = () => {
    if (title.trim() !== '') {
      props.addItem(title);
      setTitle('');
    } else {
      setError('Title is required');
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addItem();
    }
  }

  return <div>
    <TextField
      variant="standard"
      value={title}
      onChange={onChangeHandler}
      onKeyPress={onKeyPressHandler}
      label='Title'
      error={!!error}
      helperText={error}
    />
    <IconButton color="secondary" size="small" onClick={addItem}>
      <Addchart/>
    </IconButton>

  </div>
}
