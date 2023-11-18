import React from 'react';
import { NavLink } from 'react-router-dom';

function Navber() {
	return (
		<header className="header">
			<NavLink
				to="/"
				className="flex items-center justify-center w-10 h-10 rounded-lg bg-white font-bold shadow-md"
			>
				<p className="blue-gradient_text">S</p>
			</NavLink>

			<nav className="flex text-lg gap-7 font-medium">
				<NavLink
					to="/about"
					className={({ isActive }) =>
						isActive ? 'text-blue-500' : 'text-black'
					}
				>
					About
				</NavLink>
			</nav>
		</header>
	);
}

export default Navber;
