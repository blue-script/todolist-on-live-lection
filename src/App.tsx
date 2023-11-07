import React from 'react';
import './App.css';
import TodoList from "./TodoList";

function App() {
  const TodoListTitle_1: string = "What to learn"
  const TodoListTitle_2 = "What to buy"
  return (
      <div className="App">
        <TodoList title={TodoListTitle_1}/>
        <TodoList title={TodoListTitle_2}/>
      </div>
  )
}

export default App;
