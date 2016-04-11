import React from 'react';
import { connect } from 'react-redux';

import { fetchCardsToStudy } from '../actions.js';

import StudyCard from './StudyCard';

const PageStudy = React.createClass({
  componentWillMount: function() {
    this.context.store.dispatch(fetchCardsToStudy());
  },
  render () {
    const props = this.props;

    return (
      <div>
        {props.hasCard ?
            <StudyCard /> :
            <p>No card to study!</p>
        }
      </div>
    );
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
