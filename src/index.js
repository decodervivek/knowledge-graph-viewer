import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { closeDriver } from './neo4jConnection';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Close the Neo4j driver when the app is unmounted
window.addEventListener('unload', closeDriver);