import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import UserLogin from "./pages/UserLogin/UserLogin"
import UserSignup from "./pages/UserSignup/UserSignup"
import OtpVerification from "./pages/OtpVerification/OtpVerification";
import UserDashboard from "./pages/UserDashboard/UserDashboard";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/user-login" element={<UserLogin />} />
			<Route path="/user-signup" element={<UserSignup />} />
			<Route path="/verify-otp" element={<OtpVerification />} />
			<Route path="/user-dashboard" element={<UserDashboard />} />
		</Routes>
	);
};


export default App
