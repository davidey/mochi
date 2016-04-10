import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { FETCH_CARDS, fetchCards } from './actions.js';
import { store } from './store.js';

import App from './components/App';

store.dispatch(fetchCards());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
);
