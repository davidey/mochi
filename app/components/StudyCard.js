import React from 'react';
import { connect } from 'react-redux';

import { viewBack, setCardQuality } from '../actions.js';

const StudyCard = React.createClass({
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

    return (
      <div>
        <p>{props.front}</p>
        <button onClick={this.props.onViewBack}>View back</button>
      </div>
    );
  },
  renderBack: function () {
    const props = this.props;

    return (
      <div>
        <p>{props.back}</p>
        <ul>
          <li><button onClick={props.onSetQuality.bind(this, 0)}>0</button></li>
          <li><button onClick={props.onSetQuality.bind(this, 1)}>1</button></li>
          <li><button onClick={props.onSetQuality.bind(this, 2)}>2</button></li>
          <li><button onClick={props.onSetQuality.bind(this, 3)}>3</button></li>
          <li><button onClick={props.onSetQuality.bind(this, 4)}>4</button></li>
          <li><button onClick={props.onSetQuality.bind(this, 5)}>5</button></li>
        </ul>
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { study } = state;
  return {
    front: study.current ? study.current.front : '',
    back: study.current ? study.current.back : '',
    _id: study.current ? study.current._id : '',
    showBack: study.showBack
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onViewBack: (fields) => {
      dispatch(viewBack());
    },
    onSetQuality: (quality) => {
      dispatch(setCardQuality(quality));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyCard);
