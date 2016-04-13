class CardCollection {
  constructor(cards) {
    this.cards = cards;
  }

  get noRestudyCards() {
    return this.cards.filter(function (card) {
      return !!card.shouldRestudy === false;
    });
  }

  get restudyCards() {
    return this.cards.filter(function (card) {
      return card.shouldRestudy === true;
    });
  }

  get orderedList() {
    return this.restudyCards.concat(this.noRestudyCards);
  }

  get nextToStudy() {
    return this.cards[Math.floor(Math.random()*this.cards.length)];
  }

  removeCard(cardToRemove) {
    return this.cards.filter(function (card) {
      return card._id !== cardToRemove._id;
    });
  }

  updateStudiedCard(card) {
    if (card.shouldRestudy) {
      // Duplicate the card list
      return this.cards.filter(card => true);
    } else {
      return this.removeCard(card);
    }
  }
}

export default CardCollection;
