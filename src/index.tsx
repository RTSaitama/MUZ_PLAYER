import React from 'react';
import ReactDOM from 'react-dom/client';

import { Root } from './Root';
import './styles/main.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>


  </React.StrictMode>
);
