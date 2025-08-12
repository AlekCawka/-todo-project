import { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';

export const TodoForm = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = text.trim();

        if (!trimmed) {
            alert('Введите текст задачи');
            return;
        }в

        onAdd(trimmed, deadline || null);
        setText('');
        setDeadline('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <input
                    type="text"
                    placeholder="Что нужно сделать?"
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-2">
                <Calendar size={18} className="text-gray-500" />
                <input
                    type="datetime-local"
                    className="px-2 py-1 border rounded"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                <Plus size={18} />
                Добавить
            </button>
        </form>
    );
};