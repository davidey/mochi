import firebase from 'firebase';
import 'firebase/firestore';
import uuid from 'uuid/v1';

import { FIREBASE_DB_CONFIG } from './env';

console.log('Database config', FIREBASE_DB_CONFIG);
firebase.initializeApp(FIREBASE_DB_CONFIG);

export let db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

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
