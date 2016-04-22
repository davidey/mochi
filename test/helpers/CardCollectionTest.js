import { expect } from 'chai';

import CardCollection from "../../app/helpers/CardCollection";

const templateCard = {
  createdAt: 1460486626224,
  updatedAt: 1460486626224,
  dueAt: 1460486626224,
  studiedAt: 1460486626224,
  lastInterval: null,
  lastFactor: 2.5,
  shouldRestudy: false
};

const cards = [
  Object.assign({}, templateCard, {
    _id: 1,
    front: 'Card 1 Front',
    back: 'Card 1 Back',
  }),
  Object.assign({}, templateCard, {
    _id: 2,
    front: 'Card 2 Front',
    back: 'Card 2 Back',
    studiedAt: null
  }),
  Object.assign({}, templateCard, {
    _id: 3,
    front: 'Card 3 Front',
    back: 'Card 3 Back',
    shouldRestudy: true
  }),
  Object.assign({}, templateCard, {
    _id: 4,
    front: 'Card 4 Front',
    back: 'Card 4 Back'
  }),
];

describe('reviewCards', function () {
  const cardCollection = new CardCollection(cards);
  const list = cardCollection.reviewCards;

  it('should return a list of cards that are no new or restudy', function () {
    expect(list).to.have.length(2)
  });
});

describe('restudyCards', function () {
  const cardCollection = new CardCollection(cards);
  const list = cardCollection.restudyCards;

  it('should return a list of all cards that should be restudied', function () {
    expect(list).to.have.length(1)
  });
});

describe('newCards', function () {
  const cardCollection = new CardCollection(cards);
  const list = cardCollection.newCards;

  it('should return a list of all new cards', function () {
    expect(list).to.have.length(1)
  });
});

describe('nextToStudy', function () {
  it('should return a restudy card if any', function () {
    const cardCollection = new CardCollection(cards);
    const card = cardCollection.nextToStudy;
    expect(cards.indexOf(card)).to.equal(2);
  });

  it('should return a random card if no restudy is available', function () {
    const cardCollection = new CardCollection(cards);
    const card = cardCollection.nextToStudy;
  })

  it('should return null if no card is available', function () {
    const cardCollection = new CardCollection([]);
    const card = cardCollection.nextToStudy;

    expect(card).to.equal(null);
  })
});

describe('reduceNewCardsTo', function () {
  const cardCollection = new CardCollection(cards.concat([
    Object.assign({}, templateCard, {
      _id: 5,
      front: 'Card 1 Front',
      back: 'Card 1 Back',
      studiedAt: null
    }),
    Object.assign({}, templateCard, {
      _id: 6,
      front: 'Card 1 Front',
      back: 'Card 1 Back',
      studiedAt: null
    })
  ]));

  cardCollection.reduceNewCardsTo(2);

  it('should reduce the number of new cards in the list to the given one', function () {
    expect(cardCollection.newCards.length).to.equal(2);
  });

  it('should not remove the review or restudy cards', function () {
    expect(cardCollection.reviewCards.length).to.equal(2);
    expect(cardCollection.restudyCards.length).to.equal(1);
  });
});

describe('removeCard', function () {
  const cardCollection = new CardCollection(cards);
  const card = cards[1];
  const list = cardCollection.removeCard(card);

  it('should remove the given card', function () {
    expect(list.length).to.equal(3);
    expect(list.indexOf(card)).to.equal(-1);
  });
});

describe('replaceCard', function () {
  const newCard = Object.assign({}, templateCard, {
    _id: 1,
    front: 'New Card',
    back: 'Card 1 Back',
  });
  const cardCollection = new CardCollection(cards);
  const list = cardCollection.replaceCard(newCard);

  it('should replace a card with one with the same id', function () {
    expect(list.length).to.equal(4);
    expect(list[0].front).to.equal('New Card');
  });
});

describe('updateStudiedCard', function () {
  it('should remove the card if it\'s not a restudy one', function () {
    const cardCollection = new CardCollection(cards);
    const list = cardCollection.updateStudiedCard(cards[0]);

    expect(list.length).to.equal(3);
  });

  it('should keep the card if it\'s needed to restudy it', function () {
    const cardCollection = new CardCollection(cards);
    const restudyCard = Object.assign({}, templateCard, {
      _id: 1,
      front: 'Card 1 Front',
      back: 'Card 1 Back',
      shouldRestudy: true
    });
    const list = cardCollection.updateStudiedCard(restudyCard);

    expect(list.length).to.equal(4);
  });
});
