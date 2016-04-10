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
        <button onClick={this.props.onNext}>Next</button>
      </div>
    );
  }
});

export default StudyCard;
