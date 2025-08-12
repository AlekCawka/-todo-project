import React, { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';

import './App.css';

function App() {
  const { todos, addTodo, deleteTodo, updateTodo, toggleCompleted } = useTodos();

  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const normalize = (str) => str.trim().toLowerCase();

  const filteredTodos = todos.filter(todo => {
    // Фильтрация по статусу
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;

    // Фильтрация по поиску
    if (!normalize(todo.text).includes(normalize(search))) return false;

    return true;
  });

  const handleEdit = (id) => {
    const currentTodo = todos.find(todo => todo.id === id);
    if (!currentTodo) return;

    const newText = prompt('Новое значение:', currentTodo.text);
    if (!newText || !newText.trim()) return;

    updateTodo(id, { text: newText.trim() });
  };

  return (
    <div className="container">
      <h1 className="title">Мой Тудушник</h1>

      <TodoForm onAdd={addTodo} />

      <SearchBar search={search} onSearchChange={setSearch} />

      <FilterBar activeFilter={filter} onChange={setFilter} />

      <div className="list">
        {filteredTodos.length === 0 ? (
          <p className="empty-msg">Нет задач</p>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onToggle={toggleCompleted}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
