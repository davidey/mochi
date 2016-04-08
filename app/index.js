import React from 'react';
import ReactDOM from 'react-dom';
import PouchDB from 'pouchdb';

import { ADD_CARD, addCard } from './actions.js';
import { store } from './store.js';

var db = new PouchDB('cards');

var CardForm = React.createClass({
  getInitialState: function() {
    return store.getState().currentCard;
  },
  componentDidMount: function() {
    var self = this;
    store.subscribe(() => {
      self.setState(store.getState().currentCard);
    });
  },
  handleFrontChange: function(e) {
    this.setState({front: e.target.value});
  },
  handleBackChange: function(e) {
    this.setState({back: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();

    let card = {
      front: this.state.front,
      back: this.state.back
    };

    store.dispatch(addCard(card));

    db.post(card, function(err, result) {
      if (!err) {
        console.log('Added card to DB');
      } else {
        console.log(err);
      }
    });
  },
  render: function() {
    return (
      <div className="cardForm">
        <h2>Add Card</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Front</label>
          <input type="text" name="front" value={this.state.front} onChange={this.handleFrontChange} />
          <label>Back</label>
          <input type="text" name="back"  value={this.state.back} onChange={this.handleBackChange} />
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
});


ReactDOM.render(
  <CardForm />,
  document.getElementById('content')
);
