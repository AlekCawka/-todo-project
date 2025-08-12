import React, { useState } from 'react';
import { useTodos } from './hooks/useTodos';

import './App.css';

const App = () => {
  const { todos, addTodo, deleteTodo, updateTodo } = useTodos();
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    addTodo(inputValue);
    setInputValue('');
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <div className='container'>
      <div className='title'>Тудушник</div>

      <div className='form'>
        <input
          type='text'
          value={inputValue}
          onChange={handleChange}
          placeholder='Введите задачу'
        />
        <button onClick={handleAdd}>Добавить</button>
      </div>

      <ul className='list'>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => {
              const newText = prompt('Новое значение:', todo.text);
              if (newText) updateTodo(todo.id, newText);
            }}>Редактировать</button>
            <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default App;
