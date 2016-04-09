import PouchDB from 'pouchdb';

var db = new PouchDB('cards');

export const ADD_CARD = 'ADD_CARD';

export function addCard(card) {
  db.post(card, function(err, result) {
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
