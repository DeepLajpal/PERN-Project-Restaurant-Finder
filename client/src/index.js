import React from 'react';
import App from "./App";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

// older way 
// ReactDOM.render(<App/>, document.getElementById("root"));

// newer way 
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); 
root.render(<App/>);