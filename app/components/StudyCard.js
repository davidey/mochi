import React from 'react';

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
    return (
      <div>
        <p>Front</p>
        <button onClick={this.props.onViewBack}>View back</button>
      </div>
    );
  },
  renderBack: function () {
    return (
      <div>
        <p>Back</p>
        <button onClick={this.props.onNext}>Next</button>
      </div>
    );
  }
});

export default StudyCard;
