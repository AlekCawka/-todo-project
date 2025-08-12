import React from 'react';
import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import './App.css';


function App() {
  const {
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleCompleted
  } = useTodos();

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">📝 Мой Тудушник</h1>

      <TodoForm onAdd={addTodo} />

      <div className="mt-6">
        {todos.length === 0 && (
          <p className="text-gray-500 text-center">Нет задач</p>
        )}

        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleCompleted}
            onEdit={(id) => {
              const newText = prompt('Новое значение:', todo.text);
              if (!newText || !newText.trim()) return;

              updateTodo(id, { text: newText.trim() });
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;