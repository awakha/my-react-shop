const Header = ({ searchQuery, setSearchQuery }) => {
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);  // Обновляем состояние фильтрации
    };

    return (
        <header>
            <h1>Интернет-магазин</h1>
            <input
                type="text"
                id="search-input"
                placeholder="Введите название для фильтрации"
                value={searchQuery}
                onChange={handleSearchChange}
            />
        </header>
    );
};

export default Header;