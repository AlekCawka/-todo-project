import { useEffect, useState } from 'react';
import {
    Trash2,
    Edit,
    Clock,
    Calendar,
    CheckSquare,
    Square
} from 'lucide-react';

const getRemainingTime = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const diffMs = end - now;

    if (diffMs <= 0) return '⏰ Время вышло';

    const diffMin = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMin / 60);
    const minutes = diffMin % 60;

    return `Осталось: ${hours}ч ${minutes}м`;
};

export const TodoItem = ({ todo, onDelete, onToggle, onEdit }) => {
    const [remainingTime, setRemainingTime] = useState('');

    useEffect(() => {
        if (!todo.deadline) return;

        setRemainingTime(getRemainingTime(todo.deadline));

        const interval = setInterval(() => {
            setRemainingTime(getRemainingTime(todo.deadline));
        }, 60 * 1000); 

        return () => clearInterval(interval);
    }, [todo.deadline]);

    return (
        <div className="flex items-start justify-between border p-4 rounded-xl shadow-sm mb-3 bg-white dark:bg-zinc-800">
            <div className="flex items-start gap-3 w-full">
                <button onClick={() => onToggle(todo.id)} className="mt-1">
                    {todo.completed ? (
                        <CheckSquare size={20} className="text-green-600" />
                    ) : (
                        <Square size={20} className="text-gray-400" />
                    )}
                </button>

                <div className="flex flex-col grow">
                    <span
                        className={`text-base ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'
                            }`}
                    >
                        {todo.text}
                    </span>

                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex flex-col gap-0.5">
                        <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>Добавлено: {new Date(todo.createdAt).toLocaleString()}</span>
                        </div>

                        {todo.deadline && (
                            <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>{remainingTime}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 ml-3">
                <button onClick={() => onEdit(todo.id)} title="Редактировать">
                    <Edit size={18} className="text-blue-500 hover:text-blue-700 transition" />
                </button>

                <button onClick={() => onDelete(todo.id)} title="Удалить">
                    <Trash2 size={18} className="text-red-500 hover:text-red-700 transition" />
                </button>
            </div>
        </div>
    );
};