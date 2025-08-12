import React, { useState } from 'react';
import { useTodos } from './hooks/useTodos';

import './App.css';

function App() {
  const {
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleCompleted
  } = useTodos();

  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    addTodo(trimmed);
    setInputValue('');
  };

  const handleEdit = (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const newText = prompt('Новое значение:', todo.text);
    if (!newText || !newText.trim()) return;

    updateTodo(id, { text: newText.trim() });
  };

  const getFilteredTodos = (todos, filter) => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <div className="container">
      <h1 className="title">Мой Тудушник</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Введите задачу"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleAdd}>Добавить</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter('all')}>Все</button>
        <button onClick={() => setFilter('active')}>Активные</button>
        <button onClick={() => setFilter('completed')}>Выполненные</button>
      </div>

      <ul className="list">
        {filteredTodos.length === 0 && (
          <p className="text-gray-500 text-center">Нет задач</p>
        )}

        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleCompleted}
            onEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
