import React, { useState, useContext, useRef, useEffect } from "react";
import bgIMG from "../../assets/img.jpg";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../Context/UserContext";
import axios from "axios";
import "./OtpVerification.css";

function OtpVerification() {
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [error, setError] = useState("");
	const inputRefs = useRef([]);
	const navigate = useNavigate();
	const { setUser } = useContext(UserDataContext);

	useEffect(() => {
		if (inputRefs.current[0]) inputRefs.current[0].focus();
	}, []);

	const handleChange = (e, index) => {
		const value = e.target.value.replace(/[^0-9]/g, "");
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);
		if (value && index < otp.length - 1) {
			inputRefs.current[index + 1].focus();
		}
		if (!value && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const otpString = otp.join("");
		if (otpString.length !== 6) {
			setError("Please enter a 6-digit OTP.");
			return;
		}
		const email = localStorage.getItem("email");
		if (!email) {
			setError("Email not found. Please login again.");
			return;
		}
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/users/verify-email-otp`,
				{ email: email, otp: otpString },
				{ withCredentials: true }
			);
			if (response.status === 200) {
				setUser(response.data.user || { email });
				navigate("/user-login");
			}
		} catch (err) {
			setError(err.response?.data?.detail || "OTP verification failed.");
		}
	};

	return (
		<div className="otp-container" style={{ backgroundImage: `url(${bgIMG})` }}>
			<div className="logo">
				Ride<span>X</span>
			</div>
			<div className="otp-frame">
				<h1>Enter OTP</h1>
				<p>We have sent a 6-digit OTP to your email.</p>
				<form className="otp-form" onSubmit={handleSubmit}>
					<div className="input-boxes">
						{otp.map((digit, index) => (
							<input
								key={index}
								type="text"
								maxLength="1"
								value={digit}
								onChange={(e) => handleChange(e, index)}
								ref={(el) => (inputRefs.current[index] = el)}
								required
							/>
						))}
					</div>
					{error && <p className="error-message">{error}</p>}
					<button type="submit">Verify OTP & Login</button>
				</form>
			</div>
		</div>
	);
}

export default OtpVerification;
