import React from 'react';
import { connect } from 'react-redux';

import { ADD_CARD, addCard } from '../cardActions.js';
import { store } from '../store.js';

import CardForm from './CardForm';

var PageAddCard = React.createClass({
  render: function() {
    return (
      <CardForm />
    );
  }
});


export default PageAddCard;
