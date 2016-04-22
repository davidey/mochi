import React from 'react';
import { connect } from 'react-redux';

import { fetchCardsToStudy } from '../studyActions.js';

import StudyCover from './StudyCover';
import StudyCard from './StudyCard';
import StudySessionInfo from './StudySessionInfo';

const PageStudy = React.createClass({
  componentWillMount: function() {
    this.context.store.dispatch(fetchCardsToStudy());
  },
  render () {
    const props = this.props;

    if (!props.studying) {
      return <StudyCover />;
    }

    if (!props.hasCard) {
      return this.renderNoCards();
    }

    return (
      <div className="page-study">
        <StudyCard />
        <StudySessionInfo />
      </div>
    );
  },
  renderNoCards: function() {
    return <p>No card to study!</p>;
  }
});

PageStudy.contextTypes = {
  store: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    hasCard: state.study.current !== null
  }
}
export default connect(mapStateToProps)(PageStudy);
