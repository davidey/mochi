import React from 'react';
import ReactDOM from 'react-dom';
import PouchDB from 'pouchdb';
import { createStore } from 'redux';

import { ADD_CARD, addCard } from './actions.js';

var db = new PouchDB('cards');

const reducer = (state = 0, action) => {
  switch(action.type) {
    case ADD_CARD:
      return state + 1;
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

var CardForm = React.createClass({
  getInitialState: function() {
    return {
      front: '',
      back: ''
    };
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

    var self = this;

    db.post(card, function(err, result) {
      if (!err) {
        console.log('Added card to DB');
        self.setState({
          front: '',
          back: ''
        });
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
