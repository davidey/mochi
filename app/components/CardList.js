import React from 'react';

import { FETCH_CARDS, fetchCards } from '../actions.js';
import { store } from '../store.js';

var CardList = React.createClass({
  render: function() {
    const props = this.props;

    return (
      <div className="card-list">
        <h2>Card List</h2>
        <ul>
          {props.cards.map((card, i) =>
            <li key={i}>{card.front} - {card.back}</li>
          )}
        </ul>
      </div>
    );
  }
});

export default CardList;
