import React from "react";

const SearchBar = ({
    search,
    handleSearch,
    onSearch
}) => (
    <form action="/" method="get" onSubmit={onSearch}>
        <input
            type="text"
            id="Search"
            placeholder="Search user"
            name="s" 
            value={search}
            onChange={handleSearch}
        />
        <button type="submit">Search</button>
    </form>
);

export default SearchBar;