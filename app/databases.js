import PouchDB from 'pouchdb';

export let cardDb = new PouchDB('cards');

const now = Date.now();
const templateCard = {
  createdAt: now,
  updatedAt: now,
  dueAt: now,
  lastInterval: 0,
  lastFactor: 2.5
};

const cards = [
  Object.assign({}, templateCard, {
    front: 'Card 1 Front',
    back: 'Card 1 Back',
  }),
  Object.assign({}, templateCard, {
    front: 'Card 2 Front',
    back: 'Card 2 Back',
  }),
  Object.assign({}, templateCard, {
    front: 'Card 3 Front',
    back: 'Card 3 Back',
  }),
  Object.assign({}, templateCard, {
    front: 'Card 4 Front',
    back: 'Card 4 Back',
  }),
];

export function cardDbReset() {
  cardDb.destroy().then(function (response) {
    cardDb = new PouchDB('cards');
    cardDb.bulkDocs(cards);
  }).catch(function (err) {
    console.log(err);
  });
};
