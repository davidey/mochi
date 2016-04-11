import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {Router, Route, hashHistory} from 'react-router';

import { FETCH_CARDS, fetchCards } from './actions.js';
import { store } from './store.js';

import App from './components/App';
import PageAddCard from './components/PageAddCard';
import PageStudy from './components/PageStudy';
import PageList from './components/PageList';

store.dispatch(fetchCards());

const routes = <Route component={App}>
  <Route path="/" component={PageList} />
  <Route path="/add" component={PageAddCard} />
  <Route path="/study" component={PageStudy} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('content')
);
