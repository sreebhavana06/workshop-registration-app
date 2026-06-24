function SearchBar({
  search,
  setSearch,
}) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="🔍 Search participant by name..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />
  );
}

export default SearchBar;