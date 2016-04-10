import React from 'react';
import { connect } from 'react-redux';

import { ADD_CARD, addCard } from '../actions.js';
import { store } from '../store.js';

import CardForm from './CardForm';

function mapStateToProps(state) {
  return {
    fields: {
      front: state.currentCard.front,
      back: state.currentCard.back
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (fields) => {
      dispatch(addCard(fields));
    }
  };
}

const PageAddCard = connect(mapStateToProps, mapDispatchToProps)(CardForm);

export default PageAddCard;
