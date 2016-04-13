
import { ADD_CARD, FETCH_CARDS, FETCH_CARDS_SUCCESS, FETCH_CARDS_TO_STUDY,
        FETCH_CARDS_TO_STUDY_SUCCESS, VIEW_BACK, SET_CARD_QUALITY } from './actions.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import CardCollection from './helpers/CardCollection';

const defaultStudyState = {
  list: [],
  current: null,
  cardsLeft: 0,
  cardsRestudy: 0
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
        const orderedList = cardCollection.orderedList;
        return Object.assign({}, state, {
          list: orderedList,
          current: orderedList[0],
          cardsLeft: list.length,
          cardsRestudy: restudyList.length
        });
      })(state, action);
    case VIEW_BACK:
      return Object.assign({}, state, {
        showBack: true
      });
    case SET_CARD_QUALITY:
      return ((state, action) => {
        // Removes the studied card from the list
        let list = state.list.filter(function (card) {
          return card._id !== action.cardId;
        });

        if (action.shouldRestudy) {
          const restudyList = state.list.filter(function (card) {
                  return card._id === action.cardId;
          });
          list = list.concat(restudyList);
        }
        return Object.assign({}, state, {
          list: list,
          current: list[0] || null,
          cardsLeft: list.length,
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
