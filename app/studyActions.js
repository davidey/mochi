import supermemo2 from 'supermemo2';

import { store } from './store.js';
import { db } from './databases';

export const START_STUDY = 'START_STUDY';

export const FETCH_CARDS_TO_STUDY = 'FETCH_CARDS_TO_STUDY';
export const FETCH_CARDS_TO_STUDY_SUCCESS = 'FETCH_CARDS_TO_STUDY_SUCCESS';

export const VIEW_BACK = 'VIEW_BACK';
export const SET_CARD_QUALITY = 'SET_CARD_QUALITY';
export const SET_CARD_QUALITY_SUCCESS = 'SET_CARD_QUALITY_SUCCESS';


import uuid from 'uuid/v1';
const now = Date.now();
const templateCard = {
  createdAt: now,
  updatedAt: now,
  dueAt: now,
  studiedAt: null,
  lastInterval: null,
  lastFactor: 2.5
};

const mockCards = [
  Object.assign({}, templateCard, {
    _id: uuid(),
    front: 'Card 1 Front',
    back: 'Card 1 Back',
  }),
  Object.assign({}, templateCard, {
    _id: uuid(),
    front: 'Card 2 Front',
    back: 'Card 2 Back',
  }),
  Object.assign({}, templateCard, {
    _id: uuid(),
    front: 'Card 3 Front',
    back: 'Card 3 Back',
  }),
  Object.assign({}, templateCard, {
    _id: uuid(),
    front: 'Card 4 Front',
    back: 'Card 4 Back',
  }),
];

export function startStudy(newCards) {
  return {
    type: START_STUDY,
    newCards: newCards || 0
  };
}

export function fetchCardsToStudy() {
  db.collection('cards').where('dueAt', '<=', Date.now()).get()
    .then(querySnapshot => {
      let cards = [];
      querySnapshot.forEach((doc) => {
        console.log('Doc', doc);
        cards.push(doc.data());
      });
      console.log('Cards to study', cards);
      store.dispatch(fetchCardsToStudySuccess(cards));
    });

  return {
    type: FETCH_CARDS_TO_STUDY
  };
}

export function fetchCardsToStudySuccess(cards) {
  return {
    type: FETCH_CARDS_TO_STUDY_SUCCESS,
    cards: mockCards
  };
}

export function viewBack() {
  return {
    type: VIEW_BACK
  };
}

export function setCardQuality(quality, card) {
  const result = supermemo2(quality, card.lastInterval, card.lastFactor);

  console.log('Supermemo2 result', result);

  const updatedCard = Object.assign({}, card, {
    updatedAt: Date.now(),
    dueAt: Date.now() + 86400 * result.schedule * 1000,
    studiedAt: Date.now(),
    lastFactor: result.factor,
    lastInterval: result.schedule,
    shouldRestudy: result.isRepeatAgain,
  });

  db.collection('cards').doc(card._id).set(updatedCard, {merge: true})
    .then(() => {
      store.dispatch({
        type: SET_CARD_QUALITY_SUCCESS,
        quality: quality,
        card: updatedCard,
        shouldRestudy: result.isRepeatAgain
      });
    })
    .catch(error => {
      console.error(error);
    });

  return {
    type: SET_CARD_QUALITY,
    quality: quality,
    card: updatedCard,
    shouldRestudy: result.isRepeatAgain
  };
}
