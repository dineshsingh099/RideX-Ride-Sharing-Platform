import React, { useState } from "react";
import "./Sidebar.css";

const colors = [
	"#f44336",
	"#e91e63",
	"#9c27b0",
	"#673ab7",
	"#3f51b5",
	"#2196f3",
	"#03a9f4",
	"#00bcd4",
	"#009688",
	"#4caf50",
	"#8bc34a",
	"#cddc39",
	"#ffeb3b",
	"#ffc107",
	"#ff9800",
	"#ff5722",
	"#795548",
	"#9e9e9e",
	"#607d8b",
	"#f06292",
	"#ba68c8",
	"#7986cb",
	"#4db6ac",
	"#aed581",
	"#ffd54f",
];

const Sidebar = ({ title, user, menuItems, actionButton }) => {
	const [showLogoutModal, setShowLogoutModal] = useState(false);

	const getColor = (letter) => {
		const index = letter.toUpperCase().charCodeAt(0) % colors.length;
		return colors[index];
	};

	const handleLogout = () => {
		actionButton.onClick();
		setShowLogoutModal(false);
	};

	return (
		<div className="sidebar">
			<div>
				<h3 className="sidebar-title">{title}</h3>
				{user && (
					<div className="sidebar-user-info">
						<div
							className="profile-icon"
							style={{ backgroundColor: getColor(user.name[0]) }}
						>
							{user.name[0].toUpperCase()}
						</div>
						<div className="user-details">
							<p>
								<strong>{user.name}</strong>
							</p>
							<p>{user.email}</p>
						</div>
					</div>
				)}
				<ul className="sidebar-menu">
					{menuItems.map((item, index) => (
						<li key={index}>
							<a href={item.link}>{item.label}</a>
						</li>
					))}
				</ul>
			</div>
			{actionButton && (
				<button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
					{actionButton.label}
				</button>
			)}
			{showLogoutModal && (
				<div className="modal-overlay">
					<div className="modal-content">
						<p>Are you sure you want to logout?</p>
						<div className="modal-buttons">
							<button className="confirm-btn" onClick={handleLogout}>
								Yes
							</button>
							<button
								className="cancel-btn"
								onClick={() => setShowLogoutModal(false)}
							>
								No
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Sidebar;
