import React from 'react';
import { connect } from 'react-redux';

import { viewBack, setCardQuality } from '../studyActions.js';

const StudySessionInfo = React.createClass({
  handleSetQuality: function(quality) {
    this.props.onSetQuality(quality, this.props._id);
  },
  render () {
    const props = this.props;

    return (
      <ul className="study-session-info">
        <li>Review: {props.cardsReview}</li>
        <li>Restudy: {props.cardsRestudy}</li>
        <li>New: {props.cardsNew}</li>
      </ul>
    );
  },
});

function mapStateToProps(state) {
  const { study } = state;
  return {
    cardsReview: study.cardsReview,
    cardsRestudy: study.cardsRestudy,
    cardsNew: study.cardsNew
  };
}

export default connect(mapStateToProps)(StudySessionInfo);
