import React, { useEffect, useState } from 'react';
import { getSession } from './neo4jConnection';
import CytoscapeGraph from './components/CytoscapeGraph';
import './App.css';

function App() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [filterText, setFilterText] = useState('');
  const [filteredData, setFilteredData] = useState({ nodes: [], links: [] });

  // ... (keep the existing useEffect hooks and other functions)

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px', background: '#f0f0f0', zIndex: 1000 }}>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter text"
          value={filterText}
          onChange={handleFilterChange}
          className="centered-input"
        />
        </div>
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <CytoscapeGraph graphData={filteredData} />
      </div>
    </div>
  );
}

export default App;