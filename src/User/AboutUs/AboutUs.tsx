// AboutUs.js
import React from "react";
import "./AboutUs.css";
import HomeHeader from "../HomeLoggedIn/HeaderLogin/HeaderLogin.tsx";
import Footer from "../Home/footer/Footer.tsx";
const AboutUs = () => {
  return (
    <>
      <HomeHeader />
      <div className="about-container text-black w-[80%] mx-auto my-24">
        <div className="about-header">
          <h1>About Us</h1>
          <p>
            Learn more about our mission, vision, and the team behind our
            success.
          </p>
        </div>
        <div className="about-content">
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              Our mission is to deliver the best products and services to our
              customers. We strive to achieve excellence in every aspect of our
              business and are committed to continuous improvement.
            </p>
          </div>
          <div className="about-section">
            <h2>Our Vision</h2>
            <p>
              We envision a world where our products bring joy and convenience
              to people's lives. Our goal is to be a leader in our industry and
              set new standards for quality and customer satisfaction.
            </p>
          </div>
          <div className="about-section">
            <h2>Meet the Team</h2>
            <p>
              Our team is composed of passionate and talented individuals who
              are dedicated to making a difference. Together, we work hard to
              bring you the best products and services possible.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
