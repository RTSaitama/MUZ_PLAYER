import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n/i18n'
import { Root } from './Root';
import './styles/main.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>


  </React.StrictMode>
);
