import React from 'react';
import './HowItWorks.css';

function HowItWorks() {
  const steps = [
    "Enter your source and destination stations",
    "App calculates shortest path & fare",
    "View route and fare details instantly!"
  ];

  return (
    <div className="howItWorksContainer">
      <h1 className="title">How It Works</h1>
      <ul className="stepper">
        {steps.map((label, index) => (
          <li key={index} className="step">
            <div className="stepLabel">{label}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HowItWorks;