import PouchDB from 'pouchdb';

import { COUCHDB_IP, COUCHDB_PORT} from './env.js';

console.log(COUCHDB_IP, COUCHDB_PORT);


import firebase from 'firebase';
import 'firebase/firestore';
import uuid from 'uuid/v1';

var config = {
  apiKey: "AIzaSyCsb5d7ppOMWy_Uvj6Y8ygBWGZ6CNlhWew",
  authDomain: "mochi-d915a.firebaseapp.com",
  databaseURL: "https://mochi-d915a.firebaseio.com",
  projectId: "mochi-d915a",
  storageBucket: "mochi-d915a.appspot.com",
  messagingSenderId: "796369237287"
};
firebase.initializeApp(config);

export let db = firebase.firestore();

console.log('db', db);

PouchDB.debug.enable('pouchdb:api');
PouchDB.debug.enable('pouchdb:http');

export let cardDb;
const remoteCardDb = new PouchDB(`http://${COUCHDB_IP}:${COUCHDB_PORT}/cards`);

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
  lastInterval: null,
  lastFactor: 2.5
};

const cards = [
  Object.assign({}, templateCard, {
    _id: uuid(),
    front: 'Card 1 Front',
    back: 'Card 1 Back',
  }),
  Object.assign({}, templateCard, {
    _id: uuid(),
    front: 'Card 2 Front',
    back: 'Card 2 Back',
  }),
  Object.assign({}, templateCard, {
    _id: uuid(),
    front: 'Card 3 Front',
    back: 'Card 3 Back',
  }),
  Object.assign({}, templateCard, {
    _id: uuid(),
    front: 'Card 4 Front',
    back: 'Card 4 Back',
  }),
];

// cards.map(card => {
//   db.collection('cards').doc(card._id).set(card);
// });