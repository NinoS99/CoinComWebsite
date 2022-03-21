import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import {AuthContextProvider} from "./context/AuthContext"
import "./style.css"

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

