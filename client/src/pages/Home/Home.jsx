import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaCarSide, FaTruck, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom"
import RightLogo from "../../assets/hero-logo.png"
import "./Home.css";

function Home() {
	return (
		<>
			<Navbar />
			<section id="hero" className="hero">
				<div className="hero-left">
					<div className="hero-content">
						<h1>
							Ride<span>X</span> – Ride Smarter, Travel Better
						</h1>
						<p>
							Fast, safe, and reliable rides at your fingertips. Book city
							rides, outstation trips, or send parcels — we make every ride
							comfortable and secure.
						</p>
						<Link to="/user-login" className="btn-hero">
							Book Your Ride
						</Link>
					</div>
				</div>
				<div className="hero-right">
					<img src={RightLogo} alt="RideX Banner" />
				</div>
			</section>

			<section id="about" className="about">
				<div className="about-container">
					<h2 className="about-title">
						About Ride<span>X</span>
					</h2>
					<p className="about-text">
						At <span className="highlight-green">RideX</span>, we are committed
						to transforming the way people travel. Our mission is to provide
						safe, reliable, and convenient rides for everyone, whether it’s
						commuting within the city, taking an outstation trip, or sending
						parcels across town. We understand that in today’s fast-paced world,
						people need transportation solutions that are not only quick but
						also trustworthy and secure. Our team at{" "}
						<span className="highlight-darkblue">RideX</span>
						consists of experienced professionals and verified drivers who are
						dedicated to ensuring every ride meets the highest standards of
						safety and comfort. We combine cutting-edge technology with a
						user-friendly platform to make booking a ride as simple as a few
						clicks on your smartphone. Customer satisfaction is at the core of
						everything we do. We believe in transparency, timely service, and
						constant innovation to meet the evolving needs of our users. Our
						services are designed to be flexible, catering to daily commuters,
						occasional travelers, and businesses that require reliable parcel
						delivery. By choosing <span className="highlight-green">RideX</span>
						, you are choosing a service that values your time, safety, and
						convenience. Our goal is to make every journey a pleasant
						experience, backed by real-time tracking, verified drivers, and a
						support team that is always ready to assist you. Ride smarter,
						travel better, and experience the future of urban mobility with
						<span className="highlight-darkblue"> RideX</span>.
					</p>
				</div>
			</section>

			<section id="services" className="services">
				<div className="services-container">
					<h2 className="services-title">Our Services</h2>
					<div className="service-cards">
						<div className="service-card">
							<FaCarSide className="service-icon" />
							<h3>Ride Booking</h3>
							<p>
								Book rides quickly and safely with professional and trusted
								drivers.
							</p>
						</div>
						<div className="service-card">
							<FaTruck className="service-icon" />
							<h3>Parcel Delivery</h3>
							<p>
								Fast and secure delivery of packages within the city, tracked in
								real-time.
							</p>
						</div>
						<div className="service-card">
							<FaShieldAlt className="service-icon" />
							<h3>Safe Driving & Security</h3>
							<p>
								All rides are monitored for safety. Verified drivers ensure a
								secure journey.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section id="faq" className="faq">
				<div className="faq-container">
					<h2 className="faq-title">Frequently Asked Questions</h2>
					<div className="faq-cards">
						<div className="faq-card">
							<h3>How do I book a ride?</h3>
							<p>
								Simply click on 'Book Your Ride', choose your pickup and drop
								location, and confirm your ride with a trusted driver.
							</p>
						</div>
						<div className="faq-card">
							<h3>Is my ride safe?</h3>
							<p>
								All drivers are verified and rides are monitored for safety to
								ensure a secure journey.
							</p>
						</div>
						<div className="faq-card">
							<h3>Can I deliver packages?</h3>
							<p>
								Yes! You can choose the Parcel Delivery service for fast and
								secure delivery within the city.
							</p>
						</div>
					</div>
				</div>
			</section>

			

			<Footer />
		</>
	);
}

export default Home;
