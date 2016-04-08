import React from 'react';
import ReactDOM from 'react-dom';
import PouchDB from 'pouchdb';

var db = new PouchDB('cards');

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
    console.log(card, db);

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
