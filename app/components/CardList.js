import React from 'react';

import { ADD_CARD, addCard } from '../actions.js';
import { store } from '../store.js';

var CardList = React.createClass({
  render: function() {
    return (
      <h2>Card List</h2>
    );
  }
});

export default CardList;
