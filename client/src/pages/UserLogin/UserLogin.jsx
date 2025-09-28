import React, { useState, useContext } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import bgIMG from "../../assets/img.jpg";
import Logo from "../../assets/login.png";
import axios from "axios";
import "./UserLogin.css";

import { UserDataContext } from "../../Context/UserContext";

const UserLogin = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const { setUser } = useContext(UserDataContext);
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const response = await axios.post("/users/login",
				{ email, password },
				{ withCredentials: true }
			);

			if (response.status === 200) {
				setUser(response.data.user || { email });
				navigate("/user-dashboard");
			}
		} catch (err) {
			if (err.response?.data?.detail) {
				setError(err.response.data.detail); // show backend error message
			} else {
				setError("Login failed. Please try again.");
			}
		}
	};

	return (
		<div
			className="login-container"
			style={{ backgroundImage: `url(${bgIMG})` }}
		>
			<div className="login-logo">
				Ride<span>X</span>
			</div>

			<div className="login-frame">
				<div className="left-frame">
					<h1>User Login</h1>
					<form onSubmit={submitHandler} autoComplete="off">
						<div className="input-box">
							<FaEnvelope className="icon" />
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>

						<div className="input-box">
							<FaLock className="icon" />
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<span
								className="eye-icon"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</span>
						</div>

						{error && <p className="error-message">{error}</p>}

						<div className="forgot-password">
							<Link to="/forgot-password">Forgot Password?</Link>
						</div>

						<button type="submit" className="login-btns">Login</button>

						<div className="register-link">
							Don’t have an account? <Link to="/user-signup">Sign Up</Link>
						</div>
					</form>
				</div>

				<div className="right-frame">
					<img src={Logo} alt="Driver Logo" className="driver-logo" />
					<div className="driver-login">
						<p className="or-line">Prefer driving? Login as a Driver</p>
						<Link to="/driver-login" className="driver-button">
							Driver Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserLogin;
