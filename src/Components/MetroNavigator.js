import React, { useState } from 'react';

const MetroNavigator = () => {
  // Metro station data structure
  const [metroGraph, setMetroGraph] = useState({
    'Noida Sector 62~B': { neighbors: ['Botanical Garden~B'], distance: 8, fare: 20 },
    'Botanical Garden~B': { neighbors: ['Noida Sector 62~B', 'Yamuna Bank~B'], distance: 10, fare: 25 },
    // Add all other stations similarly...
  });

  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Dijkstra's algorithm for shortest path
  const dijkstra = (src, des, useTime = false) => {
    const distances = {};
    const previous = {};
    const nodes = new Set();
    let path = [];

    // Initialize distances
    for (const vertex in metroGraph) {
      distances[vertex] = Infinity;
      previous[vertex] = null;
      nodes.add(vertex);
    }
    distances[src] = 0;

    while (nodes.size) {
      let smallest = null;
      for (const node of nodes) {
        if (smallest === null || distances[node] < distances[smallest]) {
          smallest = node;
        }
      }

      if (smallest === des) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }

      if (smallest === null || distances[smallest] === Infinity) {
        break;
      }

      nodes.delete(smallest);

      for (const neighbor of metroGraph[smallest].neighbors) {
        const alt = distances[smallest] + 
          (useTime ? 120 + 40 * metroGraph[smallest].neighbors[neighbor] : 
           metroGraph[smallest].neighbors[neighbor]);
        
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = smallest;
        }
      }
    }

    return {
      path: path.concat(src).reverse(),
      distance: distances[des],
      time: Math.ceil(distances[des] / 60)
    };
  };

  const handleCalculate = () => {
    if (!startStation || !endStation) {
      setError('Please select both stations');
      return;
    }

    if (!metroGraph[startStation] || !metroGraph[endStation]) {
      setError('Invalid station selected');
      return;
    }

    if (startStation === endStation) {
      setError('Start and end stations cannot be the same');
      return;
    }

    setError('');
    const distanceResult = dijkstra(startStation, endStation, false);
    const timeResult = dijkstra(startStation, endStation, true);

    setResults({
      shortestPath: distanceResult.path.join(' → '),
      distance: distanceResult.distance,
      fastestPath: timeResult.path.join(' → '),
      time: timeResult.time
    });
  };

  return (
    <div className="metro-navigator">
      {/* Button in Hero section to open modal */}
      {/* <button 
        onClick={() => setShowModal(true)}
        className="metro-button"
      >
        <h2>Plan Your Metro</h2>
      </button> */}

      {/* Modal for metro navigation */}
      {showModal && (
        <div className="metro-modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Delhi Metro Navigator</h2>
            
            <div className="station-selector">
            {/* add closing button here */}
              {/* Source station..... */}
              <div>
                <label>Start Station:</label>
                <select 
                  value={startStation} 
                  onChange={(e) => setStartStation(e.target.value)}
                >
                  <option value="">Select Station</option>
                  {Object.keys(metroGraph).map(station => (
                    <option key={`start-${station}`} value={station}>
                      {station}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Destination station.... */}
              <div>
                <label>End Station:</label>
                <select 
                  value={endStation} 
                  onChange={(e) => setEndStation(e.target.value)}
                >
                  <option value="">Select Station</option>
                  {Object.keys(metroGraph).map(station => (
                    <option key={`end-${station}`} value={station}>
                      {station}
                    </option>
                  ))}
                </select>
              </div>
              
              <button onClick={handleCalculate} style={{background: 'red'}}>Calculate Route</button>
            </div>

            {error && <div className="error">{error}</div>}

            {results && (
              <div className="results">
                <h3>Shortest Route:</h3>
                <p><strong>Path:</strong> {results.shortestPath}</p>
                <p><strong>Distance:</strong> {results.distance} km</p>
                
                <h3>Fastest Route:</h3>
                <p><strong>Path:</strong> {results.fastestPath}</p>
                <p><strong>Estimated Time:</strong> {results.time} minutes</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MetroNavigator;