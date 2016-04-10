import React from 'react';

import { FETCH_CARDS, fetchCards } from '../actions.js';
import { store } from '../store.js';

var CardList = React.createClass({
  getInitialState: function() {
    return {
      cards: store.getState().cards
    }
  },
  componentDidMount: function() {
    var self = this;
    store.subscribe(() => {
      self.setState({
        cards: store.getState().cards
      });
    });
  },
  render: function() {
    return (
      <div className="card-list">
        <h2>Card List</h2>
        <ul>
          {this.state.cards.map((card, i) =>
            <li key={i}>{card.front} - {card.back}</li>
          )}
        </ul>
      </div>
    );
  }
});

export default CardList;
