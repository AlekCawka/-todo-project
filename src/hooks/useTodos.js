import { useState, useEffect } from 'react';
import { Trash2, Edit, Clock, Calendar, CheckSquare, Square } from 'lucide-react';

const generateId = () => crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;

export const useTodos = () => {
    const [todos, setTodos] = useState([]);

    const normalize = (text) => text.trim().toLowerCase();

    useEffect(() => {
        const stored = localStorage.getItem('todos');
        if (stored) {
            setTodos(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text, deadline = null) => {
        const trimmed = text.trim();

        if (!trimmed) return;

        const isDuplicate = todos.some(todo => normalize(todo.text) === normalize(text));

        if (isDuplicate) {
            return;
        }

        const newTodo = {
            id: generateId(),
            text: trimmed,
            completed: false,
            createdAt: new Date().toISOString(),
            deadline: deadline || null,
        };
        setTodos(prevTodos => [newTodo, ...prevTodos]);
    };

    const deleteTodo = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const updateTodo = (id, updates) => {
        if (!id) {
            console.warn("[updateTodo] Не передан id задачи");
            return;
        }

        if (typeof updates !== "object" || updates === null) {
            console.warn("[updateTodo] updates должен быть объектом, получено:", updates);
            return;
        }

        setTodos(prev => {
            const todoExists = prev.some(todo => todo.id === id);
            if (!todoExists) {
                console.warn(`[updateTodo] Задача с id "${id}" не найдена`);
                return prev;
            }

            if (updates.text && updates.text.trim()) {
                const normalized = updates.text.trim().toLowerCase();
                const isDuplicate = prev.some(
                    todo => todo.id !== id && todo.text.trim().toLowerCase() === normalized
                );
                if (isDuplicate) {
                    console.warn(`[updateTodo] Задача "${updates.text}" уже существует`);
                    return prev;
                }
            }

            return prev.map(todo =>
                todo.id === id ? { ...todo, ...updates } : todo
            );
        });
    };

    const toggleCompleted = (id) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ?
                    { ...todo, completed: !todo.completed } : todo
            )
        )
    }

    return {
        todos,
        addTodo,
        deleteTodo,
        updateTodo,
        toggleCompleted,
    };
};

