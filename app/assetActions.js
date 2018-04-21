import { store } from './store.js';
import { db } from './databases';

import uuid from 'uuid/v1';

export const ADD_ASSET = 'ADD_ASSET';
export const FETCH_ASSETS = 'FETCH_ASSETS';
export const FETCH_ASSETS_SUCCESS = 'FETCH_ASSETS_SUCCESS';

export function addAsset(asset) {
  const now = Date.now();
  const doc = Object.assign({}, asset, {
    _id: uuid(),
    createdAt: now,
    updatedAt: now,
  });

  db.collection('assets').doc(doc._id).set(doc)
    .then(docRef => {
      console.log('Added asset to DB', docRef.id);
    })
    .catch(error => {
      console.log(error);
    });

  return {
    type: ADD_ASSET,
    asset
  };
}

export function fetchAssets() {
  db.collection('cards').get().then((querySnapshot) => {
    let cards = [];
    querySnapshot.forEach((doc) => {
      cards.push(doc.data());
    });
    store.dispatch(fetchAssetsSuccess(cards));
  });

  return {
    type: FETCH_ASSETS
  };
}

export function fetchAssetsSuccess(cards) {
  return {
    type: FETCH_ASSETS_SUCCESS,
    cards: cards
  };
}
