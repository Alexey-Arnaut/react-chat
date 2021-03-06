import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './store';
import { HashRouter as Router } from 'react-router-dom';

import { App } from './App';

import './styles/style.scss'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router >
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);