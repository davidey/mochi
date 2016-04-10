import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {Router, Route, hashHistory} from 'react-router';

import { FETCH_CARDS, fetchCards } from './actions.js';
import { store } from './store.js';

import App from './components/App';
import CardForm from './components/CardForm';
import CardList from './components/CardList';

store.dispatch(fetchCards());

const routes = <Route component={App}>
  <Route path="/" component={CardList} />
  <Route path="/add" component={CardForm} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('content')
);
