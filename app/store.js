
import { ADD_CARD, FETCH_CARDS, FETCH_CARDS_SUCCESS, VIEW_BACK,
        addCard, fetchCards, fetchCardsSuccess, viewBack } from './actions.js';
import { createStore, combineReducers } from 'redux';

const defaultStudyState = {
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
    case VIEW_BACK:
      return {
        showBack: true
      };
    default:
      return state;
  }
};

const appReducer = combineReducers({
  cards: cardReducer,
  study: studyReducer
});

export const store = createStore(appReducer);

store.subscribe(() => {
  console.log(arguments, store.getState());
});
