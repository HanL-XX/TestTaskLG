import React from "react";

const Authen = ({
    auth,
    handleAuth
}) => (
    <form>
        <label>Authentication Code</label>
        <input
            type="password"
            id="authen-code"
            placeholder="Code"
            style={{width: "200px"}}
            value={auth}
            onChange={handleAuth}
        />
    </form>
);

export default Authen;