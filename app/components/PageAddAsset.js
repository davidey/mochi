import React from 'react';
import { connect } from 'react-redux';

import { ADD_ASSET, addAsset } from '../assetActions.js';
import { store } from '../store.js';

import AssetForm from './AssetForm';

function mapStateToProps(state) {
  return {
    fields: {
      text: ''
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (fields) => {

        console.log('ASSET FIELDS', fields);
      dispatch(addAsset(fields));
    }
  };
}

const PageAddAsset = connect(mapStateToProps, mapDispatchToProps)(AssetForm);

export default PageAddAsset;
