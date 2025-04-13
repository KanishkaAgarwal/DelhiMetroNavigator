import React from 'react';

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
    <div style={styles.container}>
      <h2 style={styles.title}>Key Features</h2>
      <div style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <div key={index} style={styles.featureCard}>
            <div style={styles.icon}>{feature.icon}</div>
            <h4 style={styles.featureTitle}>{feature.title}</h4>
            <p style={styles.featureDesc}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '32px',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  featuresContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: '16px',
  },
  featureCard: {
    flex: '1 1 calc(33.333% - 16px)', // Default to 3 columns
    margin: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    padding: '16px',
    textAlign: 'center',
    height: '100%',
    borderRadius: '8px',
    backgroundColor: '#fff',
    transition: 'transform 0.2s',
  },
  icon: {
    fontSize: '50px',
    marginBottom: '16px',
  },
  featureTitle: {
    marginTop: '16px',
    marginBottom: '8px',
  },
  featureDesc: {
    margin: '0',
  },
};

// Media queries for responsiveness
const mediaQueries = {
  '@media (max-width: 768px)': {
    featureCard: {
      flex: '1 1 calc(50% - 16px)', // 2 columns on medium screens
    },
  },
  '@media (max-width: 480px)': {
    featureCard: {
      flex: '1 1 100%', // 1 column on small screens
    },
  },
};

// Apply media queries to styles
Object.keys(mediaQueries).forEach((query) => {
  const stylesForQuery = mediaQueries[query];
  Object.keys(stylesForQuery).forEach((key) => {
    styles[key] = { ...styles[key], ...stylesForQuery[key] };
  });
});

export default Features;