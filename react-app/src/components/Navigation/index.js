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
				<div className="home-logo">
					<NavLink exact to="/">BoardBonanza</NavLink>
				</div>
				{sessionUser && (
					<NavLink exact to="/boards">My Dashboard</NavLink>
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
