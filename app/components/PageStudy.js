import React from 'react';
import { connect } from 'react-redux';

import { viewBack } from '../actions.js';

import StudyCard from './StudyCard';

function mapStateToProps(state) {
  return {
    showBack: state.study.showBack
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
  render () {
    return (
      <ControlledStudyCard />
    );
  }
});

export default PageStudy;
