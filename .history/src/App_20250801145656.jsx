import React from 'react';
// import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { useTodos } from './hooks/useTodos';

export default function App() {
  const { todos, addTodo, deleteTodo, toggleComplete } = useTodos();

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h1>Моя тудушка</h1>
      <TodoForm addTodo={addTodo} />
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {todos.length === 0 && <p>Задач нет, добавь первую!</p>}
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}