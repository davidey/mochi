import React from 'react';
import ReactDOM from 'react-dom';

var CardForm = React.createClass({
  getInitialState: function() {
    return {
      front: '',
      back: ''
    };
  },
  handleFrontChange: function(e) {
    console.log(e);
    this.setState({front: e.target.value});
  },
  handleBackChange: function(e) {
    this.setState({back: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    console.log(this.state);
  },
  render: function() {
    return (
      <div className="cardForm">
        <h2>Add Card</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Front</label>
          <input type="text" name="front" onChange={this.handleFrontChange} />
          <label>Back</label>
          <input type="text" name="back"  onChange={this.handleBackChange} />
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
