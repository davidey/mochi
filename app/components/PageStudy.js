import React from 'react';
import { connect } from 'react-redux';

import { viewBack, fetchCardsToStudy, studyNext } from '../actions.js';

import StudyCard from './StudyCard';

function mapStateToProps(state) {
  const { study } = state;
  return {
    front: study.current.front,
    back: study.current.back,
    showBack: study.showBack,
    hasNext: study.hasNext
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onViewBack: (fields) => {
      dispatch(viewBack());
    },
    onNext: () => {
      dispatch(studyNext());
    }
  };
}

const ControlledStudyCard = connect(mapStateToProps, mapDispatchToProps)(StudyCard);

const PageStudy = React.createClass({
  componentWillMount: function() {
    this.context.store.dispatch(fetchCardsToStudy());
  },
  render () {
    return (
      <ControlledStudyCard />
    );
  }
});

PageStudy.contextTypes = {
  store: React.PropTypes.object
};

export default PageStudy;
