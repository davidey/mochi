import React from 'react';
import { connect } from 'react-redux';

import { extend } from 'lodash';

import { store } from '../store.js';

import { selectAsset } from '../assetActions.js';

import CardForm from './CardForm';

var PageStudyAsset = React.createClass({
  getInitialState: function() {
    return {
      selectedText: 'this is a test'
    };
  },

  componentWillMount: function () {
    store.dispatch(selectAsset(this.props.params.assetId));
    //this.selectableArea = React.createRef();
  },

  componentDidMount: function () {
    setInterval(function() {
      let selection = window.getSelection();
      if (selection.anchorNode && selection.anchorNode.parentNode === this.refs.selectableArea) {
        console.log('Selection', selection.toString());
        this.setState(extend(this.state, {
          selectedText: selection.toString()
        }));
      }
    }.bind(this), 1000);

  },

  render: function() {
    const props = this.props;
    const state = this.state;

    return (
      <div>
        <h2>Study Asset</h2>
        {props.asset && <p className="study-asset-text" ref='selectableArea'>{props.asset.text}</p>}
        <CardForm front={state.selectedText} />
      </div>
    );
  }
});

function mapStateToProps(state) {
  console.log('')
  return {
    asset : state.assets.current
  };
}

export default connect(mapStateToProps, null)(PageStudyAsset);
