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
    })

    useEffect(() => {
        localStorage.setItem(JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text, deadline = null) => {
        const trimmed = text.trim();

        if (!trimmed) return;

        const isDuplicate = todos.some(item => normalize(item.value) === normalize(text));

        if (isDuplicate) return;

        const newTodo = {
            id: generateId(),
            text: text.trim(),
            completed: false,
            createdAt: new Date().toString(),
            deadline: deadline || null,
        };
        setTodos(prev => [...prev, newTodo]);
    }

    const deleteTodo = (id) => {
        setTodos(prev => prev.filter(item => item.id !== id));
    }

    const updateTodo = (id) => {
        const currentItem = todos.find(item => item.id === id);
        if (!currentItem) return;

        let newNormalizedItem = '';

        while (true) {
            const userInput = prompt('Введите новое значение: ', currentItem.value);
            if (userInput === null) return;

            if (!normalize(userInput)) {
                alert('Введите не пустое значение');
                continue;
            }

            const candidate = normalize(userInput);

            const isDuplicate = todos.some(item =>
                normalize(item.value) === candidate && item.id !== id
            );

            if (isDuplicate) {
                alert('Такой элемент уже существует');
                continue;
            }

            newNormalizedItem = userInput.trim();
            break;
        }

        setTodos(prevItems => {
            const updatedList = prevItems.map(item =>
                item.id === id ? { ...item, value: newNormalizedItem } : item
            );
            return updatedList.sort((a, b) => a.value.localeCompare(b.value));
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
}

// const generateId = () => crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;

// export const useTodos = () => {
//     const [todos, setTodos] = useState([]);

//     const normalize = (text) => text.trim().toLowerCase();

//     useEffect(() => {
//         const stored = localStorage.getItem('todos');
//         if (stored) {
//             setTodos(JSON.parse(stored));
//         }
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('todos', JSON.stringify(todos));
//     }, [todos]);

//     const addTodo = (text, deadline = null) => {
//         const trimmed = text.trim();

//         if (!trimmed) return;

//         const isDuplicate = todos.some(todo => normalize(todo.text) === normalize(text));

//         if (isDuplicate) {
//             return;
//         }

//         const newTodo = {
//             id: generateId(),
//             text: trimmed,
//             completed: false,
//             createdAt: new Date().toISOString(),
//             deadline: deadline || null,
//         };
//         setTodos(prevTodos => [newTodo, ...prevTodos]);
//     };

//     const deleteTodo = (id) => {
//         setTodos(prev => prev.filter(todo => todo.id !== id));
//     };

//     const updateTodo = (id, updates) => {
//         setTodos(prev =>
//             prev.map(todo =>
//                 todo.id === id ?
//                     { ...todo, ...updates } : todo
//             )
//         );
//     };

//     const toggleCompleted = (id) => {
//         setTodos(prev =>
//             prev.map(todo =>
//                 todo.id === id ?
//                     { ...todo, completed: !todo.completed } : todo
//             )
//         )
//     }

//     return {
//         todos,
//         addTodo,
//         deleteTodo,
//         updateTodo,
//         toggleCompleted,
//     };
// };

