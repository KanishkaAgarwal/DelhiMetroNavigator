// MetroNavigator.js
import React, { useState } from 'react';
import './Hero.css';
import MetroGraph from './MetroGraph';

const metroGraph = MetroGraph.createMetroMap();

function MetroNavigator() {
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [result, setResult] = useState(null);
  const [searchType, setSearchType] = useState('distance'); // 'distance' or 'time'

  const stations = [
    'Noida Sector 62~B',
    'Botanical Garden~B',
    'Yamuna Bank~B',
    'Rajiv Chowk~BY',
    'Vaishali~B',
    'Moti Nagar~B',
    'Janak Puri West~BO',
    'Dwarka Sector 21~B',
    'Huda City Center~Y',
    'Saket~Y',
    'Vishwavidyalaya~Y',
    'Chandni Chowk~Y',
    'New Delhi~YO',
    'AIIMS~Y',
    'Shivaji Stadium~O',
    'DDS Campus~O',
    'IGI Airport~O',
    'Rajouri Garden~BP',
    'Netaji Subhash Place~PR',
    'Punjabi Bagh West~P'
  ];

  const handleCalculate = () => {
    if (!startStation || !endStation) {
      alert('Please select both stations');
      return;
    }
    
    if (!metroGraph.containsVertex(startStation) || !metroGraph.containsVertex(endStation)) {
      alert('One or both stations are invalid');
      return;
    }

    const processed = new Map();
    if (!metroGraph.hasPath(startStation, endStation, processed)) {
      alert('No path exists between these stations');
      return;
    }

    if (searchType === 'distance') {
      const path = metroGraph.getMinimumDistance(startStation, endStation);
      const interchanges = metroGraph.getInterchanges(path);
      setResult({
        type: 'Distance',
        path: interchanges,
        value: interchanges[interchanges.length - 1] + ' km'
      });
    } else {
      const path = metroGraph.getMinimumTime(startStation, endStation);
      const interchanges = metroGraph.getInterchanges(path);
      setResult({
        type: 'Time',
        path: interchanges,
        value: interchanges[interchanges.length - 1] + ' minutes'
      });
    }
  };

  return (
    <div className="navigator-container">
      <h2 className="navigator-title">Plan Your Metro Journey</h2>
      
      <div className="navigator-radio-group">
        <label>
          <input
            type="radio"
            value="distance"
            checked={searchType === 'distance'}
            onChange={() => setSearchType('distance')}
          />
          Shortest Distance
        </label>
        <label>
          <input
            type="radio"
            value="time"
            checked={searchType === 'time'}
            onChange={() => setSearchType('time')}
          />
          Shortest Time
        </label>
      </div>
      
      <div className="navigator-input-group">
        <label className="navigator-label">From:</label>
        <select
          value={startStation}
          onChange={(e) => setStartStation(e.target.value)}
          className="navigator-select"
        >
          <option value="">Select starting station</option>
          {stations.map(station => (
            <option key={station} value={station}>{station}</option>
          ))}
        </select>
      </div>
      
      <div className="navigator-input-group">
        <label className="navigator-label">To:</label>
        <select
          value={endStation}
          onChange={(e) => setEndStation(e.target.value)}
          className="navigator-select"
        >
          <option value="">Select destination station</option>
          {stations.map(station => (
            <option key={station} value={station}>{station}</option>
          ))}
        </select>
      </div>
      
      <button 
        onClick={handleCalculate}
        className="navigator-button"
      >
        Calculate Route
      </button>
      
      {result && (
        <div className="navigator-result">
          <h3 className="navigator-result-title">Recommended Route ({result.type})</h3>
          <p><strong>Total {result.type.toLowerCase()}:</strong> {result.value}</p>
          <p><strong>Interchanges:</strong> {result.path[result.path.length - 2]}</p>
          <div className="navigator-path">
            <p><strong>Path:</strong></p>
            <p>START ⇒ {result.path[0]}</p>
            {result.path.slice(1, -2).map((step, index) => (
              <p key={index}>{step}</p>
            ))}
            <p>{result.path[result.path.length - 3]} ⇒ END</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MetroNavigator;