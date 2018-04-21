import React from 'react';
import { connect } from 'react-redux';

import { startStudy } from '../studyActions';

const StudyCover = React.createClass({
  getInitialState: function() {
    const { fields } = this.props;
    return {
      fields
    };
  },
  componentWillReceiveProps(nextProps) {
    const { fields } = nextProps;
    this.setState({
      fields
    });
  },
  handleChangeNewCards: function(e) {
    const fields = Object.assign({}, this.state.fields, {
      newCards: parseInt(e.target.value)
    });
    this.setState({
      fields: fields
    });
  },
  handleStart: function(e) {
    this.props.onStart(this.state.fields.newCards);
  },
  render () {
    const { fields } = this.state;
    const props = this.props;

    return (
      <div>
        <p>You have {props.reviewCards} reviews for today</p>
        <p>Add <input type="number" value={fields.newCards} onChange={this.handleChangeNewCards}/> of&nbsp;
            {props.fields.newCards} new cards</p>
        <button onClick={this.handleStart}>Start</button>
      </div>
    )
  }
});


function mapStateToProps(state) {
  const { study } = state;
  return {
    fields: {
      newCards: study.cardsNew
    },
    reviewCards: study.cardsReview + study.cardsRestudy
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onStart: (newCards) => {
      dispatch(startStudy(newCards));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyCover);
