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
};

export default App;
