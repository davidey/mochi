import { expect } from 'chai';

import CardCollection from "../../app/helpers/CardCollection";

const templateCard = {
  createdAt: 1460486626224,
  updatedAt: 1460486626224,
  dueAt: 1460486626224,
  lastInterval: 0,
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

describe('noRestudyCards', function () {
    const cardCollection = new CardCollection(cards);
    const list = cardCollection.noRestudyCards;

    it('should return a list of all cards but the restudy ones', function () {
      expect(list).to.have.length(3)
    });
});

describe('restudyCards', function () {
    const cardCollection = new CardCollection(cards);
    const list = cardCollection.restudyCards;

    it('should return a list of all cards that should be restudied', function () {
      expect(list).to.have.length(1)
    });
});

describe('orderedList', function () {
    const cardCollection = new CardCollection(cards);
    const list = cardCollection.orderedList;

    it('should return a list an ordered list of cards with the restudy at the front', function () {
      expect(list).to.have.length(4);
      expect(list[0].shouldRestudy).to.equal(true);
    });
});

describe('nextToStudy', function () {
    const cardCollection = new CardCollection(cards);
    const card = cardCollection.nextToStudy;

    it('should return a random card', function () {
      expect(cards.indexOf(card)).to.be.above(-1);
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

describe('updateStudiedCard', function () {
    const cardCollection = new CardCollection(cards);

    it('should remove the card if it\'s not a restudy one', function () {
      const list = cardCollection.updateStudiedCard(cards[0]);
      expect(list.length).to.equal(3);
    });

    it('should keep the card if it\'s needed to restudy it', function () {
      const list = cardCollection.updateStudiedCard(cards[2]);
      expect(list.length).to.equal(4);
    });
});
