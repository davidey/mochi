import React from 'react';
import { extend } from 'lodash';

var CardForm = React.createClass({
  getInitialState: function() {
    const { fields } = this.props;
    return {
      fields
    };
  },
  componentWillReceiveProps(nextProps) {
    console.log('getting props')
    const { fields } = nextProps;
    this.setState({
      fields
    });
  },
  handleFrontChange: function(e) {
    const fields = extend(this.state.fields, {
      front: e.target.value
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
          <label>Back</label>
          <input type="text" name="back"  value={fields.back} onChange={this.handleBackChange} />
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
});

export default CardForm;
