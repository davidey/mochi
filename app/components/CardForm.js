import React from 'react';
import { connect } from 'react-redux';

import { ADD_CARD, addCard } from '../actions.js';
import { store } from '../store.js';

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

    this.props.onSubmit(card);
  },
  render: function() {
    const state = this.state;

    return (
      <div className="cardForm">
        <h2>Add Card</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Front</label>
          <input type="text" name="front" value={state.front} onChange={this.handleFrontChange} />
          <label>Back</label>
          <input type="text" name="back"  value={state.back} onChange={this.handleBackChange} />
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
});

function mapStateToProps(state) {
  console.log('state')
  return {
    front: state.currentCard.front,
    back: state.currentCard.back
  }
}

function mapDispatchToProps(dispatch) {
  console.log('dispatch');
  return {
    onSubmit: (card) => {
      dispatch(addCard(card));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardForm);
