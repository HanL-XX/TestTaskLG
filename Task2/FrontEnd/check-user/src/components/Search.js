import React from "react";

const SearchBar = () => (
    <form>
        <label>Authentication Code</label>
        <input
            type="password"
            id="authen-code"
            placeholder="Code"
            style={{width: "200px"}}
        />
    </form>
);

export default SearchBar;