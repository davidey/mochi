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
      <div>
        <p>Cards to review: {props.cardsReview}</p>
        <p>Cards to restudy: {props.cardsRestudy}</p>
        <p>Cards new: {props.cardsNew}</p>
      </div>
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
