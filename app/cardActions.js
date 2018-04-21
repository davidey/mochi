import { store } from './store.js';
import { db } from './databases';

export const ADD_CARD = 'ADD_CARD';
export const FETCH_CARDS = 'FETCH_CARDS';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';

export function addCard(card) {
  const now = Date.now();
  const doc = Object.assign({}, card, {
    createdAt: now,
    updatedAt: now,
    dueAt: now,
    lastInterval: null,
    lastFactor: 2.5,
    shouldRestudy: false,
    studiedAt: null
  });
  
  db.collection('cards').add(doc)
    .then(docRef => {
      console.log('Added card to DB', docRef.id);
    })
    .catch(error => {
      console.log(error);
    });

  return {
    type: ADD_CARD,
    card
  };
}

export function fetchCards() {
  db.collection('cards').get().then((querySnapshot) => {
    let cards = [];
    querySnapshot.forEach((doc) => {
      cards.push(doc.data());
    });
    store.dispatch(fetchCardsSuccess(cards));
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
