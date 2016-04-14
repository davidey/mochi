import { ADD_CARD, FETCH_CARDS, FETCH_CARDS_SUCCESS, FETCH_CARDS_TO_STUDY,
        FETCH_CARDS_TO_STUDY_SUCCESS, VIEW_BACK, SET_CARD_QUALITY, SET_CARD_QUALITY_SUCCESS } from './actions.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import CardCollection from './helpers/CardCollection';

const defaultStudyState = {
  list: [],
  current: null,
  cardsReview: 0,
  cardsRestudy: 0,
  cardsNew: 0
};

const defaultCardState = {
  list: [],
  current: {
    front: '',
    back: ''
  }
};

const cardReducer = (state = defaultCardState, action) => {
  switch(action.type) {
    case ADD_CARD:
      return {
        list: state.list.concat(action.card),
        current: state.current
      };
    case FETCH_CARDS:
      return state;
    case FETCH_CARDS_SUCCESS:
      return {
        list: action.cards,
        current: state.current
      };
    default:
      return state;
  }
};

const studyReducer = (state = defaultStudyState, action) => {
  switch(action.type) {
    case FETCH_CARDS_TO_STUDY:
      return state;
    case FETCH_CARDS_TO_STUDY_SUCCESS:
      return ((state, action) => {
        const cardCollection = new CardCollection(action.cards);
        const currentCard = cardCollection.nextToStudy;
        return Object.assign({}, state, {
          list: action.cards,
          current: currentCard,
          cardsReview: cardCollection.reviewCards.length,
          cardsRestudy: cardCollection.restudyCards.length,
          cardsNew: cardCollection.newCards.length,
        });
      })(state, action);
    case VIEW_BACK:
      return Object.assign({}, state, {
        showBack: true
      });
    case SET_CARD_QUALITY:
      return state;
    case SET_CARD_QUALITY_SUCCESS:
      return ((state, action) => {
        const cardCollection = new CardCollection(state.list);
        const newList = cardCollection.updateStudiedCard(action.card)
        const currentCard = cardCollection.nextToStudy;
        return Object.assign({}, state, {
          list: newList,
          current: currentCard,
          cardsReview: cardCollection.reviewCards.length,
          cardsRestudy: cardCollection.restudyCards.length,
          cardsNew: cardCollection.newCards.length,
          showBack: false
        });
      })(state, action);
    default:
      return state;
  }
};

const appReducer = combineReducers({
  cards: cardReducer,
  study: studyReducer
});

const logger = createLogger();

export const store = createStore(
  appReducer,
  applyMiddleware(logger)
);
