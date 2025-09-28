import { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="navbar-container">
			<div className="navbar">
				<h2 className="home-logo">
					Ride<span>X</span>
				</h2>

				<div className="nav-links">
					<Link smooth to="#hero">
						Home
					</Link>
					<Link smooth to="#about">
						About
					</Link>
					<Link smooth to="#services">
						Services
					</Link>
					<Link smooth to="#faq">
						FAQ'S
					</Link>
					<Link smooth to="#contact">
						Contact
					</Link>
				</div>

				<div className="login-btn">
					<Link to="/user-login" className="btn">
						Login
					</Link>
				</div>

				<div
					className="mobile-menu-icon"
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				>
					{isSidebarOpen ? <FaTimes /> : <FaBars />}
				</div>
			</div>

			<div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
				<Link smooth to="#hero" onClick={() => setIsSidebarOpen(false)}>
					Home
				</Link>
				<Link smooth to="#about" onClick={() => setIsSidebarOpen(false)}>
					About
				</Link>
				<Link smooth to="#services" onClick={() => setIsSidebarOpen(false)}>
					Services
				</Link>
				<Link smooth to="#faq" onClick={() => setIsSidebarOpen(false)}>
					FAQ'S
				</Link>
				<Link smooth to="#contact" onClick={() => setIsSidebarOpen(false)}>
					Contact
				</Link>
				<Link
					to="/user-login"
					className="mobile-login-btn"
					onClick={() => setIsSidebarOpen(false)}
				>
					Login
				</Link>
			</div>
		</div>
	);
}

export default Navbar;
