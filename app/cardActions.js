import { store } from './store.js';
import { cardDb } from './databases';

export const ADD_CARD = 'ADD_CARD';
export const FETCH_CARDS = 'FETCH_CARDS';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';

export function addCard(card) {
  const now = Date.now();
  const doc = Object.assign({}, card, {
    createdAt: now,
    updatedAt: now,
    dueAt: now,
    lastInterval: 0,
    lastFactor: 2.5,
    shouldRestudy: false
  })
  cardDb.post(doc, function(err, result) {
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
  cardDb.allDocs({include_docs: true, descending: true}, function(err, doc) {
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
