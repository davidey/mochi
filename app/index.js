import React from 'react';
import ReactDOM from 'react-dom';

var CardEntry = React.createClass({
  render: function() {
    return (
      <div className="cardEntry">
        <label>Front</label>
        <input type="text" name="front" />
        <label>Back</label>
        <input type="text" name="back" />
      </div>
    );
  }
});

var CardForm = React.createClass({
  render: function() {
    return (
      <form className="cardForm">
        <h2>Add Card</h2>
        <CardEntry />
        <input type="submit" value="Save" />
      </form>
    );
  }
});

console.log('working');


ReactDOM.render(
  <CardForm />,
  document.getElementById('content')
);
