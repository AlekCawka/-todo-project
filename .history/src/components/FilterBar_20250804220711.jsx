export const FilterBar = ({ activeFilter, onChange }) => {
    const filters = [
        { label: 'Все', value: 'all' },
        { label: 'Активные', value: 'active' },
        { label: 'Выполненные', value: 'completed' },
    ];

    return (
        <div className="filter">
            {filters.map((f) => (
                <button
                    key={f.value}
                    className={`filter-btn ${activeFilter === f.value ? 'active' : ''}`}
                    onClick={() => onChange(f.value)}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
};
