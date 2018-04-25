import React from 'react';
import { connect } from 'react-redux';

import { store } from '../store.js';

import { selectAsset } from '../assetActions.js';

import CardForm from './CardForm';

var PageStudyAsset = React.createClass({
  componentWillMount: function () {
    store.dispatch(selectAsset(this.props.params.assetId));
    //this.selectableArea = React.createRef();
  },

  componentDidMount: function () {
      this.refs.selectableArea.addEventListener('selectstart', (e) => console.log('SELECTION STARTED'));
      this.refs.selectableArea.addEventListener('selectionchange', (e) => console.log('SELECTION CHANGED'));
  },

  render: function() {
    const props = this.props;

    return (
      <div>
        <h2>Study Asset</h2>
        <p ref='selectableArea'>{props.asset.text}</p>
        <CardForm />
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    asset : state.assets.current
  };
}

export default connect(mapStateToProps, null)(PageStudyAsset);
