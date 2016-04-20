import React from 'react';
import { connect } from 'react-redux';

import { fetchCardsToStudy } from '../actions.js';

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
  renderStudyCover: function() {
    return (
      <div>
        <p>You have 4 reviews for today</p>
        <p>Add <input type="number" value="3" /> new cards</p>
        <button>Start</button>
      </div>
    )
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
