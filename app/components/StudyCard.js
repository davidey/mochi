import React from 'react';
import { connect } from 'react-redux';

import { viewBack, setCardQuality } from '../studyActions.js';

const StudyCard = React.createClass({
  handleSetQuality: function(quality) {
    this.props.onSetQuality(quality, this.props.card);
  },
  render () {
    const props = this.props;

    return (
      <div className="page-study">
        {!props.showBack ?
          this.renderFront() :
          this.renderBack()
        }
      </div>
    );
  },
  renderFront: function () {
    const props = this.props;
    const { card } = props;

    return (
      <div>
        <p>{card.front}</p>
        <p>{card.lastFactor}</p>
        <p>{card.dueAt}</p>
        <pre>{JSON.stringify(card, null, 2)}</pre>
        <button onClick={this.props.onViewBack}>View back</button>
      </div>
    );
  },
  renderBack: function () {
    const props = this.props;
    const { card } = props;
    return (
      <div>
        <p>{card.back}</p>
        <ul>
          <li><button onClick={this.handleSetQuality.bind(this, 0)}>0</button></li>
          <li><button onClick={this.handleSetQuality.bind(this, 1)}>1</button></li>
          <li><button onClick={this.handleSetQuality.bind(this, 2)}>2</button></li>
          <li><button onClick={this.handleSetQuality.bind(this, 3)}>3</button></li>
          <li><button onClick={this.handleSetQuality.bind(this, 4)}>4</button></li>
          <li><button onClick={this.handleSetQuality.bind(this, 5)}>5</button></li>
        </ul>
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { study } = state;
  return {
    card: study.current,
    showBack: study.showBack
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onViewBack: (fields) => {
      dispatch(viewBack());
    },
    onSetQuality: (quality, cardId) => {
      dispatch(setCardQuality(quality, cardId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyCard);
