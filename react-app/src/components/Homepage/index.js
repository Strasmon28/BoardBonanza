import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import "./Homepage.css"

function Homepage () {
    const currentUser = useSelector((state) => state.session.user)
    return(
        <>
            <div className="homepage">
                <h1 className="homepage-title">Welcome to BoardBonanza</h1>
                <p className="homepage-description">BoardBonanza provides simple yet high quality cards for planning out projects no matter the scale</p>
                <p className="homepage-description">Simple UI makes it quick and easy to create and manage your projects</p>
                <p className="homepage-description">Many customization options lets you decorate your board and helps keep track of your progress</p>
                <h3>Don't get bored of your projects, board it!</h3>

                {currentUser ?
                    (
                        <>
                            <h4>Let's get back to planning</h4>
                            <NavLink to='/boards'>My Dashboard</NavLink>
                        </>
                    )
                    :
                    (
                        <>
                        <h4>Want to get started?</h4>
                        <div className="dashboard-auth-container">
                        <OpenModalButton
                            buttonText="Log In"
                            buttonClassName={"dashboard-login-button"}
                            // onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />

                        <p className="or"> OR </p>

                        <OpenModalButton
                            buttonText="Sign Up"
                            buttonClassName={"dashboard-login-button"}
                            // onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                        </div>
                        </>
                    )}
            </div>
        </>
    )
}

export default Homepage
