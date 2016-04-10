import React from 'react';
import { connect } from 'react-redux';

import { viewBack, fetchCardsToStudy } from '../actions.js';

import StudyCard from './StudyCard';

function mapStateToProps(state) {
  return {
    showBack: state.study.showBack,
    front: state.study.current.front,
    back: state.study.current.back
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onViewBack: (fields) => {
      dispatch(viewBack());
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
