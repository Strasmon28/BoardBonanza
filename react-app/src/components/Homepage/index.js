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
                <h3>Don't get bored of your projects, board it!</h3>
                <p className="homepage-description">BoardBonanza provides simple yet high quality cards for planning out projects no matter the scale</p>
                <p className="homepage-description">Simple UI makes it quick and easy to create and manage your projects</p>
                <p className="homepage-description">Many customization options lets you decorate your board and helps keep track of your progress</p>
                <h3>Perfect planning promotes perfect performance</h3>


                {currentUser ?
                    (
                        <>
                            <h4>Let's get back to planning</h4>
                            <NavLink className="homepage-dashboard-redirect" to='/boards'>My Dashboard</NavLink>
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

            <div className="homepage-section2">
                <h3>Boards are the backbone</h3>
                <p>Boards will help organize your thoughts, simplifying your workflow</p>
                <p>Keep all your progress organized using lists and labels</p>
                <h3>List critical ideas</h3>
                <p>Lists can mark down key points of your project</p>
                <p>Specific topics and milestones are its specialty</p>
                <h3>Make cards of the specifics</h3>
                <p>Go further in detail of your milestones</p>
                <p>Label each card to easily mark your progress</p>
            </div>
        </>
    )
}

export default Homepage
