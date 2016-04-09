import React from 'react';

import CardList from './CardList';
import CardForm from './CardForm';

var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <CardList />
        <CardForm />
      </div>
    );
  }
});

export default App;
