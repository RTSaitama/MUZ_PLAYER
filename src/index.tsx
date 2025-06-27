import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { Root } from './Root';
import './styles/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
 