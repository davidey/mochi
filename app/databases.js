import PouchDB from 'pouchdb';

PouchDB.debug.enable('pouchdb:api');
PouchDB.debug.enable('pouchdb:http');

export let cardDb;
const remoteCardDb = new PouchDB('http://localhost:5984/cards');

function initDb() {
  cardDb = new PouchDB('cards');

  cardDb.sync(remoteCardDb, {
    live: true,
    retry: true
  }).on('error', function (err) {
    console.err(err);
  });
}

initDb();

const now = Date.now();
const templateCard = {
  createdAt: now,
  updatedAt: now,
  dueAt: now,
  studiedAt: null,
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
    initDb();
    cardDb.bulkDocs(cards);
  }).catch(function (err) {
    console.log(err);
  });
};
