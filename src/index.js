import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FileUpload from './components/FileUpload';


ReactDOM.render(
  <React.StrictMode>
    <App />
    <FileUpload />
  </React.StrictMode>,
  document.getElementById('root')
);
