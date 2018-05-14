
const firebase = require('firebase-admin');

const sourceAdmin = firebase.initializeApp({
  apiKey: "AIzaSyCsb5d7ppOMWy_Uvj6Y8ygBWGZ6CNlhWew",
  authDomain: "mochi-d915a.firebaseapp.com",
  databaseURL: "https://mochi-d915a.firebaseio.com",
  projectId: "mochi-d915a",
  storageBucket: "mochi-d915a.appspot.com",
  messagingSenderId: "796369237287"
});

const destinyAdmin = firebase.initializeApp({
  apiKey: "AIzaSyDX6kbchdLHBFQirb0WBizqhhu2eg8gUms",
  authDomain: "mochi-dev-1a384.firebaseapp.com",
  databaseURL: "https://mochi-dev-1a384.firebaseio.com",
  projectId: "mochi-dev-1a384",
  storageBucket: "mochi-dev-1a384.appspot.com",
  messagingSenderId: "114872178616"
}, "destination");

var source = sourceAdmin.firestore();
var destination = destinationAdmin.firestore();

const copy = (sourceDBrep, destinationDBref, aux) => {
  return Promise.all(Object.keys(aux).map((collection) => {
    return sourceDBrep.collection(collection).get()
      .then((data) => {
        let promises = [];
        data.forEach((doc) => {
          const data = doc.data();
          promises.push(
            destinationDBref.collection(collection).doc(doc.id).set(data).then((data) => {
              return copy(sourceDBrep.collection(collection).doc(doc.id),
              destinationDBref.collection(collection).doc(doc.id),
              aux[collection])
            })
          );
        })
      return Promise.all(promises);
    })
  }));
};

copy(source, destination, aux).then(() => {
  console.log('copied');
});
