import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

const CytoscapeGraph = ({ graphData }) => {
  const containerRef = useRef(null);
  const cyRef = useRef(null);

  useEffect(() => {
    if (!graphData.nodes.length) return;

    if (!cyRef.current) {
      cyRef.current = cytoscape({
        container: containerRef.current,
        style: [
          {
            selector: 'node',
            style: {
              'background-color': 'data(color)',
              'label': 'data(label)',
              'color': '#fff',
              'text-outline-width': 2,
              'text-outline-color': '#888',
              'font-size': 12,
              'text-valign': 'center',
              'text-halign': 'center',
            }
          },
          {
            selector: 'edge',
            style: {
              'width': 1,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier',
              'label': 'data(label)',
              'font-size': 10,
              'text-rotation': 'autorotate'
            }
          }
        ],
      });
    }

    cyRef.current.elements().remove();
    cyRef.current.add([
      ...graphData.nodes.map(node => ({
        data: { ...node, id: node.id.toString() }
      })),
      ...graphData.links.map(link => ({
        data: {
          ...link,
          id: `${link.source}-${link.target}`,
          source: link.source.toString(),
          target: link.target.toString()
        }
      }))
    ]);

    cyRef.current.layout({
      name: 'cose',
      animate: true,
      refresh: 1,
      componentSpacing: 100,
      nodeOverlap: 20,
      idealEdgeLength: 100,
      edgeElasticity: 100,
      nestingFactor: 5,
      gravity: 80,
      numIter: 1000,
      initialTemp: 200,
      coolingFactor: 0.95,
      minTemp: 1.0
    }).run();

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, [graphData]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default CytoscapeGraph;