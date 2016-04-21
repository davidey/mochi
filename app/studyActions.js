import supermemo2 from 'supermemo2';

import { store } from './store.js';
import { cardDb } from './databases';

export const START_STUDY = 'START_STUDY';

export const FETCH_CARDS_TO_STUDY = 'FETCH_CARDS_TO_STUDY';
export const FETCH_CARDS_TO_STUDY_SUCCESS = 'FETCH_CARDS_TO_STUDY_SUCCESS';

export const VIEW_BACK = 'VIEW_BACK';
export const SET_CARD_QUALITY = 'SET_CARD_QUALITY';
export const SET_CARD_QUALITY_SUCCESS = 'SET_CARD_QUALITY_SUCCESS';

export function startStudy(newCards) {
  return {
    type: START_STUDY,
    newCards: newCards
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
  const result = supermemo2(quality, card.lastInterval, card.lastFactor);

  console.log('Supermemo2 result', result);

  const updatedCard = Object.assign({}, card, {
    updatedAt: Date.now(),
    dueAt: Date.now() + 86400 * result.schedule * 1000,
    studiedAt: Date.now(),
    lastFactor: result.factor,
    lastInterval: result.schedule,
    shouldRestudy: result.isRepeatAgain
  });
  cardDb.put(updatedCard).then(function(response) {
    const revisedCard =  Object.assign({}, updatedCard, {
      _rev: response.rev
    });
    store.dispatch({
      type: SET_CARD_QUALITY_SUCCESS,
      quality: quality,
      card: revisedCard,
      shouldRestudy: result.isRepeatAgain
    });
  }).catch(function (err) {
    console.error(err);
  });

  return {
    type: SET_CARD_QUALITY,
    quality: quality,
    card: updatedCard,
    shouldRestudy: result.isRepeatAgain
  };
}
