import React from 'react';
import { connect } from 'react-redux';

import { store } from '../store.js';

import CardList from './CardList';

function mapStateToProps(state) {
  return {
    cards : state.cards.list
  };
}

const PageList = connect(mapStateToProps, null)(CardList);

export default PageList;
