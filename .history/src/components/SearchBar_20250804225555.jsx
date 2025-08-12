export const SearchBar = ({ value, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Поиск задач..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="search-bar"
        />
    );
};
