
import { ADD_CARD, FETCH_CARDS, FETCH_CARDS_SUCCESS, FETCH_CARDS_TO_STUDY,
        FETCH_CARDS_TO_STUDY_SUCCESS, VIEW_BACK, STUDY_NEXT } from './actions.js';
import { createStore, combineReducers } from 'redux';

const defaultStudyState = {
  list: [],
  current: {
    front: '',
    back: ''
  },
  currentIndex: 0,
  hasNext: true,
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
        hasNext: true
      });
    case VIEW_BACK:
      return Object.assign({}, state, {
        showBack: true
      });
    case STUDY_NEXT:
      const nextIndex = state.currentIndex + 1;
      return Object.assign({}, state, {
        current: state.list[nextIndex],
        currentIndex: nextIndex,
        hasNext: state.list.length > nextIndex + 1,
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

export const store = createStore(appReducer);

store.subscribe(() => {
  console.log(arguments, store.getState());
});
