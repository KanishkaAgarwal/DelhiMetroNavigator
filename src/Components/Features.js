import React from 'react';
import './Features.css';

function Features() {
  const features = [
    {
      icon: '🚉', // Using emoji as an icon
      title: "Smart Route Finder",
      desc: "Input source & destination to find the quickest route using Dijkstra/BFS."
    },
    {
      icon: '💰', // Using emoji as an icon
      title: "Fare Calculator",
      desc: "Calculate exact fare based on distance—no surprises!"
    },
    {
      icon: '🗺️', // Using emoji as an icon
      title: "Interactive Metro Map",
      desc: "Zoomable metro map for seamless journey planning."
    }
  ];

  return (
    <div className="features-container">
      <h2 className="features-title">Key Features</h2>
      <div className="features-list">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h4 className="feature-title">{feature.title}</h4>
            <p className="feature-desc">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;