import React, { useState } from 'react';
import backgroundVideo from './video.mp4';

function Hero() {
  const [showMetroNavigator, setShowMetroNavigator] = useState(false);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          zIndex: -1,
          transform: 'translate(-50%, -50%)',
          objectFit: 'cover',
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={{ 
        backgroundColor: 'transparent',
        padding: '80px 20px', 
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontWeight: 'bold', marginBottom: '16px', color:'white' }}>
            Delhi Metro Navigator!
          </h1>
          <h3 style={{ marginBottom: '32px', color:'white' }}>
            Get the shortest route and fare information at your fingertips.
          </h3>
          <button 
            style={buttonStyle}
            onClick={() => setShowMetroNavigator(true)}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Metro Navigator Modal */}
      {showMetroNavigator && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(12, 48, 70, 0.8)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            backgroundColor: 'rgba(98, 155, 196, 0.8)',
            padding: '30px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflowY: 'auto',
            }}>
            <button 
              onClick={() => setShowMetroNavigator(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'red',
                border: 'black solid',
                fontSize: '40px',
                cursor: 'pointer',
              }}
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

const buttonStyle = {
  backgroundColor: '#ff6b35',
  color: 'white',
  border: 'none',
  padding: '12px 24px',
  fontSize: '18px',
  cursor: 'pointer',
  borderRadius: '4px',
  transition: 'background-color 0.3s',
  ':hover': {
    backgroundColor: '#e65a2b',
  }
};

// MetroNavigator component (simplified version)
function MetroNavigator() {
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [result, setResult] = useState(null);

  // Sample station data - replace with your actual station list
  const stations = [
    'Rajiv Chowk',
    'Kashmere Gate',
    'Central Secretariat',
    'Hauz Khas',
    'Karol Bagh',
    // Add all other stations...
  ];

  const handleCalculate = () => {
    // Basic validation
    if (!startStation || !endStation) {
      alert('Please select both stations');
      return;
    }
    
    // In a real app, you would calculate the route here
    setResult({
      path: `${startStation} → Example Station → ${endStation}`,
      distance: '12 km',
      time: '25 mins',
      fare: '₹30'
    });
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Plan Your Metro Journey</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>From:</label>
        <select
          value={startStation}
          onChange={(e) => setStartStation(e.target.value)}
          style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
        >
          <option value="">Select starting station</option>
          {stations.map(station => (
            <option key={station} value={station}>{station}</option>
          ))}
        </select>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>To:</label>
        <select
          value={endStation}
          onChange={(e) => setEndStation(e.target.value)}
          style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
        >
          <option value="">Select destination station</option>
          {stations.map(station => (
            <option key={station} value={station}>{station}</option>
          ))}
        </select>
      </div>
      
      <button 
        onClick={handleCalculate}
        style={{
          backgroundColor: '#ff6b35',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Calculate Route
      </button>
      
      {result && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <h3 style={{ marginBottom: '10px' }}>Recommended Route</h3>
          <p><strong>Path:</strong> {result.path}</p>
          <p><strong>Distance:</strong> {result.distance}</p>
          <p><strong>Time:</strong> {result.time}</p>
          <p><strong>Fare:</strong> {result.fare}</p>
        </div>
      )}
    </div>
  );
}

export default Hero;