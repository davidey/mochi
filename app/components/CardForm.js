import React from 'react';
import { connect } from 'react-redux';

import { extend } from 'lodash';
import * as kuroshiro from 'kuroshiro';

import { ADD_CARD, addCard } from '../cardActions.js';

kuroshiro.init({dicPath: 'dict/'});

var CardForm = React.createClass({
  getInitialState: function() {
    return {
      fields: {
        front: '',
        reading: '',
        back: ''
      }
    };
  },
  componentWillReceiveProps(nextProps) {
    console.log('NEXT PROPERTIES', nextProps);
    const fields = {
      front: nextProps.front,
      reading: kuroshiro.convert(nextProps.front, {mode: 'okurigana'})
    };
    this.setState({
      fields
    });
  },
  handleFrontChange: function(e) {
    const fields = extend(this.state.fields, {
      front: e.target.value,
      reading: kuroshiro.convert(e.target.value, {mode: 'okurigana'})
    });
    this.setState({
      fields: fields
    });
  },
  handleReadingChange: function(e) {
    const fields = extend(this.state.fields, {
      reading: e.target.value
    });
    this.setState({
      fields: fields
    });
  },
  handleBackChange: function(e) {
    const fields = extend(this.state.fields, {
      back: e.target.value
    });
    this.setState({
      fields: fields
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.fields);
  },
  render: function() {
    const { fields } = this.state;

    return (
      <div className="cardForm">
        <h2>Add Card</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Front</label>
          <input type="text" name="front" value={fields.front} onChange={this.handleFrontChange} />
          <label>Reading</label>
          <input type="text" name="reading" value={fields.reading} onChange={this.handleReadingChange} />
          <label>Back</label>
          <input type="text" name="back"  value={fields.back} onChange={this.handleBackChange} />
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (fields) => {
      dispatch(addCard(fields));
    }
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const props = extend(ownProps, stateProps, dispatchProps);
  console.log("PROPERTIES", props);
  return props;
};

export default connect(null, mapDispatchToProps, mergeProps)(CardForm);
