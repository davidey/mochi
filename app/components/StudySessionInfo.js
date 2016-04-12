import React from 'react';
import { connect } from 'react-redux';

import { viewBack, setCardQuality } from '../actions.js';

const StudySessionInfo = React.createClass({
  handleSetQuality: function(quality) {
    this.props.onSetQuality(quality, this.props._id);
  },
  render () {
    const props = this.props;

    return (
      <div>
        <p>Cards left: {props.cardsLeft}</p>
        <p>Cards to restudy: {props.cardsRestudy}</p>
      </div>
    );
  },
});

function mapStateToProps(state) {
  const { study } = state;
  return {
    cardsLeft: study.cardsLeft,
    cardsRestudy: study.cardsRestudy
  };
}

export default connect(mapStateToProps)(StudySessionInfo);
