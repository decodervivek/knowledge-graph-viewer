import React, { useEffect, useState } from 'react';
import { getSession } from './neo4jConnection';
import CytoscapeGraph from './components/CytoscapeGraph';

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
        <input
          type="text"
          placeholder="dump that frigging text here..."
          value={filterText}
          onChange={handleFilterChange}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <CytoscapeGraph graphData={filteredData} />
      </div>
    </div>
  );
}

export default App;