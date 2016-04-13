import supermemo2 from 'supermemo2';

import { store } from './store.js';
import { cardDb } from './databases';

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

export function fetchCardsToStudy() {
  function map(doc) {
    if (doc.dueAt <= Date.now()) {
      emit(doc);
    }
  }
  cardDb.query(map).then(function (result) {
    let cards = result.rows.map(row => row.key);
    store.dispatch(fetchCardsToStudySuccess(cards));
  }).catch(function (err) {
    console.log(err);
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

export function setCardQuality(quality, card) {
  var result = supermemo2(quality, card.lastInterval, card.lastFactor);
  var updatedCard = Object.assign({}, card, {
    updatedAt: Date.now(),
    dueAt: Date.now() + 86400 * result.schedule * 1000,
    lastFactor: result.factor,
    lastInterval: result.schedule,
    shouldRestudy: result.isRepeatAgain
  });

  cardDb.put(updatedCard).then(function(response) {
    // handle response
  }).catch(function (err) {
    console.log(err);
  });

  return {
    type: SET_CARD_QUALITY,
    quality: quality,
    card: updatedCard,
    shouldRestudy: result.isRepeatAgain
  };
}
