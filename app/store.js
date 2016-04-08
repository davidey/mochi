
import { ADD_CARD, addCard } from './actions.js';
import { createStore } from 'redux';

const defaultState = {
  cards: [],
  currentCard: {
    front: '',
    back: ''
  }
};

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case ADD_CARD:
      return {
        cards: state.cards.concat(action.card),
        currentCard: state.currentCard
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);

store.subscribe(() => {
  console.log(arguments, store.getState());
});
