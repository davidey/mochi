import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {Router, Route, hashHistory} from 'react-router';

import { FETCH_CARDS, fetchCards } from './cardActions.js';
import { FETCH_ASSETS, fetchAssets } from './assetActions.js';
import { store } from './store.js';
import { cardDbReset } from './databases.js';
import { OFFLINE_ENABLED } from './config.js';

import App from './components/App';
import PageAddCard from './components/PageAddCard';
import PageAddAsset from './components/PageAddAsset';
import PageListAssets from './components/PageListAssets';
import PageStudy from './components/PageStudy';
import PageList from './components/PageList';

// cardDbReset();
store.dispatch(fetchCards());
store.dispatch(fetchAssets());

const routes = <Route component={App}>
  <Route path="/" component={PageList} />
  <Route path="/add-card" component={PageAddCard} />
  <Route path="/list-assets" component={PageListAssets} />
  <Route path="/add-asset" component={PageAddAsset} />
  <Route path="/study" component={PageStudy} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('content')
);

if (OFFLINE_ENABLED) {
  UpUp.start({
    'content-url': '/offline.html',
    'assets': [
      '/bundle.js'
    ]
  });
}
