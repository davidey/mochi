import React from 'react';
import { extend } from 'lodash';

var AssetForm = React.createClass({
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
  handleTextChange: function(e) {
    const fields = extend(this.state.fields, {
      text: e.target.value
    });

      console.log('ASSET FIELDS- form', fields);
    this.setState({
      fields: fields
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();

      console.log('ASSET FIELDS', this.state.fields);
    this.props.onSubmit(this.state.fields);
  },
  render: function() {
    const { fields } = this.state;

    return (
      <div>
        <h2>Add Asset</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Asset</label>
          <textarea name="text" value={fields.asset} onChange={this.handleTextChange} />
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
});

export default AssetForm;
