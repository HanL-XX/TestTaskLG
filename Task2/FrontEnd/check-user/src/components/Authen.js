import React from "react";

const Authen = () => (
    <form action="/" method="get">
        <input
            type="text"
            id="header-search"
            placeholder="Search user"
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
);

export default Authen;