import React from 'react';

import CardList from './CardList';
import CardForm from './CardForm';

var App = React.createClass({
  render: function() {
    return React.cloneElement(this.props.children);
  }
});

export default App;
