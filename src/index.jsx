import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Dashboard from './pages/Dashboard.jsx'
import { BrowserRouter, HashRouter } from "react-router-dom";

// import Routers from "./routes";
import App from "./app.jsx";
import "./index.css";
import {createRoot} from 'react-dom/client';

function render() {
  // ReactDOM.render(<Routers/>, document.body);
  const root = createRoot( document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
}



render();