import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import { ADD_CARD, FETCH_CARDS, FETCH_CARDS_SUCCESS } from './cardActions.js';
import { ADD_ASSET, SELECT_ASSET, FETCH_ASSETS, FETCH_ASSETS_SUCCESS } from './assetActions.js';
import { START_STUDY, FETCH_CARDS_TO_STUDY, FETCH_CARDS_TO_STUDY_SUCCESS, VIEW_BACK,
          SET_CARD_QUALITY, SET_CARD_QUALITY_SUCCESS } from './studyActions.js';
import CardCollection from './helpers/CardCollection';

const defaultStudyState = {
  list: [],
  current: null,
  cardsReview: 0,
  cardsRestudy: 0,
  cardsNew: 0,
  studying: false
};

const defaultCardState = {
  list: [],
  current: {
    front: '',
    reading: '',
    back: ''
  }
};

const defaultAssetState = {
  list: [],
  current: ''
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

const assetReducer = (state = defaultAssetState, action) => {
  switch(action.type) {
    case ADD_ASSET:
      return {
        list: state.list.concat(action.asset),
        current: ''
      };
    case SELECT_ASSET:
      return Object.assign({}, state, {
        current: state.list.find(asset => asset._id === action.assetId)
      });
    case FETCH_ASSETS:
      return state;
    case FETCH_ASSETS_SUCCESS:
      return {
        list: action.assets,
        current: ''
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
        return Object.assign({}, state, {
          list: action.cards,
          cardsReview: cardCollection.reviewCards.length,
          cardsRestudy: cardCollection.restudyCards.length,
          cardsNew: cardCollection.newCards.length,
        });
      })(state, action);
    case START_STUDY:
      return ((state, action) => {
        const cardCollection = new CardCollection(state.list);
        const list = cardCollection.reduceNewCardsTo(action.newCards);
        const currentCard = cardCollection.nextToStudy;
        return Object.assign({}, state, {
          list: list,
          current: currentCard,
          cardsReview: cardCollection.reviewCards.length,
          cardsRestudy: cardCollection.restudyCards.length,
          cardsNew: cardCollection.newCards.length,
          showBack: false,
          studying: true
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
  assets: assetReducer,
  study: studyReducer
});

const logger = createLogger();

export const store = createStore(
  appReducer,
  applyMiddleware(logger)
);
