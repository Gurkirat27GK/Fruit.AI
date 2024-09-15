// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Importing styles

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Fruit.AI</h1>
        <p>Discover the power of fruits and manage your health like never before!</p>
      </header>

      <main className="home-services">
        <Link to="/chatbot" className="home-card">
          <div className="home-card-content">
            <i className="fas fa-robot home-icon"></i>
            <h3>Chatbot</h3>
            <p>Get personalized fruit recommendations tailored to your health needs.</p>
          </div>
        </Link>

        <Link to="/translator" className="home-card">
          <div className="home-card-content">
            <i className="fas fa-language home-icon"></i>
            <h3>Translator</h3>
            <p>Translate fruit-related information into your preferred language.</p>
          </div>
        </Link>

        <Link to="/faq" className="home-card">
          <div className="home-card-content">
            <i className="fas fa-question-circle home-icon"></i>
            <h3>FAQ</h3>
            <p>Find answers to frequently asked questions about fruits and health.</p>
          </div>
        </Link>

        <Link to="/about" className="home-card">
          <div className="home-card-content">
            <i className="fas fa-info-circle home-icon"></i>
            <h3>About Us</h3>
            <p>Learn more about Fruit.AI and how it can help you manage your health.</p>
          </div>
        </Link>
      </main>
    </div>
  );
};

export default Home;
