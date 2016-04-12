
import { ADD_CARD, FETCH_CARDS, FETCH_CARDS_SUCCESS, FETCH_CARDS_TO_STUDY,
        FETCH_CARDS_TO_STUDY_SUCCESS, VIEW_BACK, SET_CARD_QUALITY } from './actions.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

const defaultStudyState = {
  list: [],
  current: null,
  currentIndex: 0,
  cardsLeft: 0,
  cardsRestudy: 0,
  showBack: false
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
      return Object.assign({}, state, {
        list: action.cards,
        current: action.cards[0],
        currentIndex: 0,
        cardsLeft: action.cards.length
      });
    case VIEW_BACK:
      return Object.assign({}, state, {
        showBack: true
      });
    case SET_CARD_QUALITY:
      const nextIndex = state.currentIndex + 1;
      const nextCard = state.list[nextIndex] ? state.list[nextIndex] : null;
      return Object.assign({}, state, {
        current: nextCard,
        currentIndex: nextIndex,
        showBack: false
      });
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
