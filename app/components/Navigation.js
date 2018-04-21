import React from 'react';
import { Link } from 'react-router';

const Navigation = React.createClass({
  render () {
    return (
      <ul className="navigation">
        <li><Link to="/">List</Link></li>
        <li><Link to="/add-card">Add Card</Link></li>
        <li><Link to="/add-asset">Add Asset</Link></li>
        <li><Link to="/study">Study</Link></li>
      </ul>
    )
  }
});

export default Navigation;
