import React from 'react';
import App from "./App";

// older way 
// ReactDOM.render(<App/>, document.getElementById("root"));

// newer way 
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); 
root.render(<App/>);