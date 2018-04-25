import React from 'react';
import { Link } from 'react-router';

import { FETCH_ASSETS, fetchAssets } from '../assetActions.js';
import { store } from '../store.js';

var AssetList = React.createClass({
  handleClick: function(e, assetId) {
  },

  render: function() {
    const props = this.props;

    return (
      <div>
        <h2>Asset List</h2>
        <ul>
          {props.assets.map((asset, i) =>
            <li key={i}>
              <Link to={`/assets/${asset._id}`}>{asset.text}</Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
});

export default AssetList;
