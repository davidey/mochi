import React from 'react';
import { connect } from 'react-redux';

import { store } from '../store.js';

import AssetList from './AssetList';

function mapStateToProps(state) {
  console.log('STATE ASSETS', state.assets);
  return {
    assets : state.assets.list
  };
}

const PageListAssets = connect(mapStateToProps, null)(AssetList);

export default PageListAssets;
