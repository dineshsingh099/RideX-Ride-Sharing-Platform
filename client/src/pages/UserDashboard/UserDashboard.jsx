import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../Context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

const UserDashboard = () => {
	const { user, setUser } = useContext(UserDataContext);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get("/users/protected", {
					withCredentials: true,
				});
				setUser(res.data.user);
				setLoading(false);
			} catch {
				navigate("/user-login");
			}
		};
		fetchUser();
	}, []);

	const handleLogout = async () => {
		await axios.post("/users/logout", {}, { withCredentials: true });
		setUser(null);
		navigate("/user-login");
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div className="dashboard-container">
			<Sidebar
				user={user}
				menuItems={[
					{ label: "Dashboard", link: "/user-dashboard" },
					{ label: "Profile", link: "/user-profile" },
				]}
				actionButton={{ label: "Logout", onClick: handleLogout }}
			/>
			<div className="user-dashboard-content">
			</div>
		</div>
	);
};

export default UserDashboard;
