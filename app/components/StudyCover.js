import React from 'react';

const StudyCover = React.createClass({
  getInitialState: function() {
    const { fields } = this.props || 0;
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
    const fields = extend(this.state.fields, {
      newCards: e.target.value
    });
    this.setState({
      fields: fields
    });
  },
  render () {
    const { fields } = this.state;
    return (
      <div>
        <p>You have 4 reviews for today</p>
        <p>Add <input type="number" value="{fields.}" onChange={this.handleChangeNewCards}/> new cards</p>
        <button>Start</button>
      </div>
    )
  }
});

export default StudyCover;
