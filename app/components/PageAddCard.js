import React from 'react';
import { connect } from 'react-redux';

import { ADD_CARD, addCard } from '../cardActions.js';
import { store } from '../store.js';

import CardForm from './CardForm';

function mapStateToProps(state) {
  return {
    fields: {
      front: state.cards.current.front,
      back: state.cards.current.back
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
