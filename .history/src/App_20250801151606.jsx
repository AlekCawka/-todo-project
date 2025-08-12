import React from 'react';
import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import { TodoItem } from './components/TodoItem';

export default function App() {
  const { todos, addTodo, deleteTodo, toggleComplete } = useTodos();

  return (
    <div>
      <h1>Моя тудушка</h1>
      <TodoForm addTodo={addTodo} />
      <ul>
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