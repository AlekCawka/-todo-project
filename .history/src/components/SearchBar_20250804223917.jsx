export const SearchBar = ({ value, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Поиск задач..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400 text-sm"
        />
    );
};
