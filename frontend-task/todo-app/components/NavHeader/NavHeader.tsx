"use client";

import Link from "next/link";
import "./NavHeader.modules.css"
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NavHeader = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const toggleMenu = (): void => {
		setIsMenuOpen(!isMenuOpen);
	};
	return (
		<div>
			<nav id="desktop-nav">
				<div>
					<ul className="nav-links-list">
						<li >
							<Link className="nav-link" href="/">Todo List</Link>
						</li>
						<li>
							<Link className="nav-link" href="/about">About</Link>
						</li>
					</ul>
				</div>
			</nav>
			<nav id="hamburger-nav">
				<div className="hamburger-menu">
					<div className="hamburger-icon" onClick={() => toggleMenu()} onBlur={() => setIsMenuOpen(false)}>
						{isMenuOpen ? <X /> : <Menu />}
					</div>
					{isMenuOpen && (
						<div className={`menu-links ${isMenuOpen ? "open" : "closed"}`}>
							<li>
								<Link className="nav-link" href="/" onClick={() => toggleMenu()}>Todo List</Link>
							</li>
							<li>
								<Link className="nav-link" href="/about" onClick={() => toggleMenu()}>About</Link>
							</li>
						</div>
					)}
				</div>
			</nav>
		</div>
	);
}

export default NavHeader;