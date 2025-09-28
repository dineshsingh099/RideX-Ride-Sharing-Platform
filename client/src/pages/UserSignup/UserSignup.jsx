import React, { useState, useContext } from "react";
import {
	FaEnvelope,
	FaLock,
	FaEye,
	FaEyeSlash,
	FaUser,
	FaPhone,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import bgIMG from "../../assets/img.jpg";
import Logo from "../../assets/login.png";
import { UserDataContext } from "../../Context/UserContext";
import "./UserSignup.css";
import axios from "axios";

const UserSignup = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [number, setNumber] = useState("");
	const [name, setName] = useState("");
	const [errors, setErrors] = useState({});
	const [generalError, setGeneralError] = useState("");

	const navigate = useNavigate();
	const { setUser } = useContext(UserDataContext);

	const submitHandler = async (e) => {
		e.preventDefault();
		setErrors({});
		setGeneralError("");

		const newUser = { name, email, number, password };

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/users/register`,
				newUser
			);

			if (response.status === 200) {
				localStorage.setItem("email", newUser.email);
				setUser(response.data.user);
				navigate("/verify-otp");

				setEmail("");
				setName("");
				setNumber("");
				setPassword("");
			}
		} catch (error) {
			if (error.response?.status === 422 && error.response.data.detail) {
				const fieldErrors = {};
				error.response.data.detail.forEach((err) => {
					const field = err.loc[err.loc.length - 1];
					fieldErrors[field] = err.msg;
				});
				setErrors(fieldErrors);
			} else if (error.response?.data?.detail) {
				setGeneralError(error.response.data.detail);
			} else {
				setGeneralError("Registration failed");
			}
		}
	};

	return (
		<div
			className="register-container"
			style={{ backgroundImage: `url(${bgIMG})` }}
		>
			<div className="logo">
				Ride<span>X</span>
			</div>
			<div className="register-frame">
				<div className="left-frame">
					<h1>User Register</h1>
					<form onSubmit={submitHandler} autoComplete="off">
						<div className="input-box">
							<FaUser className="icon" />
							<input
								type="text"
								placeholder="Full Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						{errors.name && <p className="error-message">{errors.name}</p>}

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
						{errors.email && <p className="error-message">{errors.email}</p>}

						<div className="input-box">
							<FaPhone className="icon" />
							<input
								type="tel"
								placeholder="Phone Number"
								value={number}
								onChange={(e) => setNumber(e.target.value)}
								required
							/>
						</div>
						{errors.number && <p className="error-message">{errors.number}</p>}

						<div className="input-box">
							<FaLock className="icon" />
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<button
								type="button"
								className="eye-icon"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>
						{errors.password && (
							<p className="error-message">{errors.password}</p>
						)}

						{generalError && <p className="error-message">{generalError}</p>}

						<button type="submit">Sign Up</button>

						<div className="login-link">
							Already have an account? <Link to="/user-login">Login</Link>
						</div>
					</form>
				</div>

				<div className="right-frame">
					<img src={Logo} alt="User Logo" className="driver-logo" />
					<div className="driver-register">
						<p className="or-line">Prefer driving? Register as a Driver</p>
						<Link to="/driver-register" className="driver-button">
							Driver Sign Up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserSignup;
