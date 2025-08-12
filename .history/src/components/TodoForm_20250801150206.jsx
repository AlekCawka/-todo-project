import React, { useState } from 'react';

export default function TodoForm({ addTodo }) {
    const [text, setText] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (text.trim() === '') return;
        addTodo(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
            <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Новая задача"
                style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
        </form>
    );
}
