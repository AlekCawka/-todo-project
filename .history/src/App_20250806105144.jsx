import React, { useState } from 'react';
import { useTodos } from './hooks/useTodos';

import './App.css';

const App = () => {
  const { todos, addTodo, deleteTodo, updateTodo, toggleCompleted } = useTodos();
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAdd = () => {
    addTodo(inputValue);
    setInputValue('');
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="container">
      <h1 className="title">Мой Тудушник</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Введите задачу"
          value={inputValue}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Добавить</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter('all')}>Все</button>
        <button onClick={() => setFilter('active')}>Активные</button>
        <button onClick={() => setFilter('completed')}>Выполненные</button>
      </div>

      <ul className="list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
            />
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </span>
            <button onClick={() => {
              const newText = prompt('Новое значение:', todo.text);
              if (newText) updateTodo(todo.id, newText);
            }}>✏️</button>
            <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
