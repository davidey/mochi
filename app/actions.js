import PouchDB from 'pouchdb';

import { store } from './store.js';

var db = new PouchDB('cards');

export const ADD_CARD = 'ADD_CARD';
export const FETCH_CARDS = 'FETCH_CARDS';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_TO_STUDY = 'FETCH_CARDS_TO_STUDY';
export const FETCH_CARDS_TO_STUDY_SUCCESS = 'FETCH_CARDS_TO_STUDY_SUCCESS';

export const VIEW_BACK = 'VIEW_BACK';
export const SET_CARD_QUALITY = 'SET_CARD_QUALITY';

export function addCard(card) {
  const now = Date.now();
  const doc = Object.assign({}, card, {
    createdAt: now,
    updatedAt: now,
    dueAt: now,
    lastInterval: 0,
    lastFactor: 2.5
  })
  db.post(doc, function(err, result) {
    if (!err) {
      console.log('Added card to DB');
    } else {
      console.log(err);
    }
  });

  return {
    type: ADD_CARD,
    card
  };
}

export function fetchCards() {
  db.allDocs({include_docs: true, descending: true}, function(err, doc) {
    if (!err) {
      let cards = doc.rows.map(row => row.doc);
      store.dispatch(fetchCardsSuccess(cards));
    }
  });

  return {
    type: FETCH_CARDS
  };
}

export function fetchCardsSuccess(cards) {
  return {
    type: FETCH_CARDS_SUCCESS,
    cards: cards
  };
}

export function fetchCardsToStudy() {
  db.allDocs({include_docs: true, descending: true, limit: 5}, function(err, doc) {
    if (!err) {
      let cards = doc.rows.map(row => row.doc);
      store.dispatch(fetchCardsToStudySuccess(cards));
    }
  });

  return {
    type: FETCH_CARDS_TO_STUDY
  };
}

export function fetchCardsToStudySuccess(cards) {
  return {
    type: FETCH_CARDS_TO_STUDY_SUCCESS,
    cards: cards
  };
}

export function viewBack() {
  return {
    type: VIEW_BACK
  };
}

export function setCardQuality(quality) {
  return {
    type: SET_CARD_QUALITY
  };
}
