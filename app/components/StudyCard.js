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
      !props.showBack ?
          this.renderFront() :
          this.renderBack()
    );
  },
  renderFront: function () {
    const props = this.props;
    const { card } = props;

    return (
      <div className="card card-front">
        <div className="card-content"><p>{card.front}</p></div>
        <footer>
          <button className="card-view-back-btn" onClick={this.props.onViewBack}>View back</button>
        </footer>
      </div>
    );
  },
  renderBack: function () {
    const props = this.props;
    const { card } = props;
    return (
      <div className="card card-back">
        <div className="card-content"><p>{card.back}</p></div>
        <footer>
          <ul>
            <li className="card-set-quality-btn"><button onClick={this.handleSetQuality.bind(this, 0)}>0</button></li>
            <li className="card-set-quality-btn"><button onClick={this.handleSetQuality.bind(this, 1)}>1</button></li>
            <li className="card-set-quality-btn"><button onClick={this.handleSetQuality.bind(this, 2)}>2</button></li>
            <li className="card-set-quality-btn"><button onClick={this.handleSetQuality.bind(this, 3)}>3</button></li>
            <li className="card-set-quality-btn"><button onClick={this.handleSetQuality.bind(this, 4)}>4</button></li>
            <li className="card-set-quality-btn"><button onClick={this.handleSetQuality.bind(this, 5)}>5</button></li>
          </ul>
        </footer>
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
