import React from 'react';
import Button from "./Button";

type TodoListPropsType = {
  title: string
}

const TodoList: React.FC<TodoListPropsType> = (props) => {
  return (
      <div className="todoList">
        <h3>{props.title}</h3>
        <div>
          <input/>
          <Button name="+"/>
        </div>
        <ul>
          <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>
          <li><input type="checkbox" checked={true}/> <span>JS</span></li>
          <li><input type="checkbox" checked={false}/> <span>React</span></li>
        </ul>
        <div>
          <Button name="All"/>
          <Button name="Active"/>
          <Button name="Completed"/>
        </div>
      </div>
  )
}

export default TodoList