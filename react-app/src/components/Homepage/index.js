import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Homepage () {
    const sessionUser = useSelector((state) => state.session.user)
    return(
        <>
            <h1>Welcome to BoardBonanza</h1>
            {sessionUser ? (<NavLink to='/boards'>My Dashboard</NavLink>) : null}
        </>
    )
}

export default Homepage
