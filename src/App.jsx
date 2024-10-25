// src/App.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, deleteTodo } from "./features/todos/todoSlice";
import "./App.css";

const App = () => {
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (task.trim()) {
      const newTodo = { id: Date.now(), text: task };
      dispatch(addTodo(newTodo));
      setTask("");
    }
  };

  const handleEditTodo = (id, text) => {
    setIsEditing(true);
    setCurrentId(id);
    setTask(text);
  };

  const handleUpdateTodo = () => {
    dispatch(updateTodo({ id: currentId, text: task }));
    setTask("");
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={isEditing ? handleUpdateTodo : handleAddTodo}>
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleEditTodo(todo.id, todo.text)}>
              Edit
            </button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
