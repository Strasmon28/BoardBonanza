import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className="navbar">
			<div className="navbar-options">
				<div className="home-logo-container">
					<NavLink className="home-logo" exact to="/">BoardBonanza</NavLink>
				</div>
				{sessionUser && (
					<NavLink className="home-board-redirect" exact to="/boards">My Dashboard</NavLink>
				)}
			</div>
			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
