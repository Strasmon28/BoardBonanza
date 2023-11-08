import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Homepage.css"

function Homepage () {
    const currentUser = useSelector((state) => state.session.user)
    return(
        <>
            <div className="homepage">
                <h1 className="homepage-title">Welcome to BoardBonanza</h1>
                {currentUser && (<NavLink to='/boards'>My Dashboard</NavLink>)}
            </div>
        </>
    )
}

export default Homepage
