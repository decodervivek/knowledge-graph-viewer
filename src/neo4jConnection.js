import neo4j from 'neo4j-driver';

const uri = 'neo4j+s://85f374eb.databases.neo4j.io'; // Replace with your Neo4j URI
const user = 'neo4j'; // Replace with your username
const password = 'fX2s6SXZknlrHZVUn7N_kq1Vsm90O3dqjvGFE7f9eXs'; // Replace with your password

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

export const getSession = () => driver.session();

export const closeDriver = () => driver.close();