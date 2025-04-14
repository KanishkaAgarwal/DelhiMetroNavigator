import React from 'react';
import './TechOverview.css';

function TechOverview() {
  return (
    <div className="techOverviewContainer">
      <h1 className="title">Built with Robust Technology</h1>
      <p className="description">
        Our app uses Graph and Heap data structures for efficient pathfinding. 
        Nodes represent stations, and edges represent distances for accurate navigation.
      </p>
      <div className="chipsContainer">
        <span className="chip chipPrimary">Dijkstra</span>
        <span className="chip chipSecondary">Breadth-First Search</span>
        <span className="chip chipOutlined">Depth-First Search</span>
      </div>
    </div>
  );
}

export default TechOverview;