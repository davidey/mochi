import React from 'react';

import Navigation from './Navigation';

var App = React.createClass({
  getInitialState: function() {
    return {
      isNavigationOpen: false
    }
  },

  handleNavigationToggle: function(e) {
    console.log('clicking toggle');
    this.setState({
      isNavigationOpen: !this.state.isNavigationOpen
    });
  },

  render: function() {
    const children = React.cloneElement(this.props.children);
    const state = this.state;
    return (
      <div>
        <Navigation isOpen={state.isNavigationOpen}/>
        <header>
          <button className="navigation-toggle" onClick={this.handleNavigationToggle}>X</button>
        </header>
        <div className="content">
          {children}
        </div>
      </div>
    )
  }
});

export default App;
