// Hero.js
import React, { useState } from 'react';
import './Hero.css';
import backgroundVideo from './video.mp4';
import MetroNavigator from './MetroNavigator';

function Hero() {
  const [showMetroNavigator, setShowMetroNavigator] = useState(false);

  return (
    <div className="hero-container">
      <video
        autoPlay
        loop
        muted
        className="hero-video"
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-content">
        <div className="hero-inner">
          <h1 className="hero-title">Delhi Metro Navigator!</h1>
          <h3 className="hero-subtitle">
            Get the shortest route and fare information at your fingertips.
          </h3>
          <button 
            className="hero-button"
            onClick={() => setShowMetroNavigator(true)}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Metro Navigator Modal */}
      {showMetroNavigator && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              onClick={() => setShowMetroNavigator(false)}
              className="modal-close"
            >
              ×
            </button>
            <MetroNavigator />
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero;