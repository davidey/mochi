import React from 'react';

import Navigation from './Navigation';

var App = React.createClass({
  render: function() {
    const children = React.cloneElement(this.props.children);
    return (
      <div>
        <Navigation />
        {children}
      </div>
    )
  }
});

export default App;
