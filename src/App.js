import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { getSession } from './neo4jConnection';

function App() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    const fetchGraph = async () => {
      const session = getSession();
      try {
        const result = await session.run(
          'MATCH (n)-[r]->(m) RETURN n, r, m'
        );
        
        const nodes = new Map();
        const links = [];

        result.records.forEach(record => {
          const source = record.get('n');
          const target = record.get('m');
          const relationship = record.get('r');

          if (!nodes.has(source.identity.low)) {
            nodes.set(source.identity.low, {
              id: source.identity.low,
              label: source.properties.name || 'Unnamed',
              type: source.labels[0]
            });
          }

          if (!nodes.has(target.identity.low)) {
            nodes.set(target.identity.low, {
              id: target.identity.low,
              label: target.properties.name || 'Unnamed',
              type: target.labels[0]
            });
          }

          links.push({
            source: source.identity.low,
            target: target.identity.low,
            label: relationship.type
          });
        });

        setGraphData({
          nodes: Array.from(nodes.values()),
          links: links
        });
      } finally {
        await session.close();
      }
    };

    fetchGraph();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ForceGraph2D
        graphData={graphData}
        nodeLabel="label"
        nodeAutoColorBy="type"
        linkLabel="label"
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
      />
    </div>
  );
}

export default App;