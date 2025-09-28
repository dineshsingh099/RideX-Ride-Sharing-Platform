import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="footer-about">
					<h3>RideX</h3>
					<p>
						RideX provides the best ride services with comfort and safety. Join
						us for a smooth experience.
					</p>
				</div>

				<div className="footer-links">
					<h4>Quick Links</h4>
					<Link to="/">Home</Link>
					<Link to="/about">About</Link>
					<Link to="/services">Services</Link>
					<Link to="/faq">FAQ'S</Link>
					<Link to="/contact">Contact</Link>
				</div>

				<div className="footer-contact">
					<h4>Contact Us</h4>
					<p>Email: support@ridex.com</p>
					<p>Phone: +91 123 456 7890</p>
					<p>Address: 123, RideX Street, India</p>
				</div>
			</div>

			<div className="footer-bottom">
				<p>© {new Date().getFullYear()} RideX. All Rights Reserved.</p>
			</div>
		</footer>
	);
}

export default Footer;
