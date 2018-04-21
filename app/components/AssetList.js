import React from 'react';

import { FETCH_ASSETS, fetchAssets } from '../assetActions.js';
import { store } from '../store.js';

var AssetList = React.createClass({
  render: function() {
    const props = this.props;

    return (
      <div>
        <h2>Asset List</h2>
        <ul>
          {props.assets.map((asset, i) =>
            <li key={i}>{asset.text}</li>
          )}
        </ul>
      </div>
    );
  }
});

export default AssetList;
