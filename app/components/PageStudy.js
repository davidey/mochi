import React from 'react';
import { connect } from 'react-redux';

import { fetchCardsToStudy } from '../studyActions.js';

import StudyCover from './StudyCover';
import StudyCard from './StudyCard';
import StudySessionInfo from './StudySessionInfo';

const PageStudy = React.createClass({
  componentWillMount: function() {
    console.log('Store', this.context.store);
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
        <StudySessionInfo />
        <StudyCard />
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
  const { study } = state;

  return {
    hasCard: study.current !== null,
    studying: study.studying
  }
}
export default connect(mapStateToProps)(PageStudy);
