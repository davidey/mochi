import React from 'react';
import { Link } from 'react-router';

const Navigation = React.createClass({
  render () {
    const props = this.props;

    return (
      <ul className={`navigation ${props.isOpen? 'is-open' : ''}`}>
        <li><Link to="/">List</Link></li>
        <li><Link to="/add-card">Add Card</Link></li>
        <li><Link to="/assets/new">Add Asset</Link></li>
        <li><Link to="/assets">List Assets</Link></li>
        <li><Link to="/study">Study</Link></li>
      </ul>
    )
  }
});

export default Navigation;
