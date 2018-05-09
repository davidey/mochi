import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {Router, Route, hashHistory} from 'react-router';

import { FETCH_CARDS, fetchCards } from './cardActions.js';
import { FETCH_ASSETS, fetchAssets } from './assetActions.js';
import { store } from './store.js';
import { OFFLINE_ENABLED } from './config.js';

import App from './components/App';
import PageAddCard from './components/PageAddCard';
import PageAddAsset from './components/PageAddAsset';
import PageListAssets from './components/PageListAssets';
import PageStudyAsset from './components/PageStudyAsset';
import PageStudy from './components/PageStudy';
import PageList from './components/PageList';

store.dispatch(fetchCards());
store.dispatch(fetchAssets());

const routes = <Route component={App}>
  <Route path="/" component={PageList} />
  <Route path="/add-card" component={PageAddCard} />
  <Route path="/assets" component={PageListAssets} />
  <Route path="/assets/new" component={PageAddAsset} />
  <Route path="/assets/:assetId" component={PageStudyAsset} />
  <Route path="/study" component={PageStudy} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

if (OFFLINE_ENABLED) {
  UpUp.start({
    'content-url': '/offline.html',
    'assets': [
      '/bundle.js'
    ]
  });
}
