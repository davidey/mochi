class CardCollection {
  constructor(cards) {
    this.cards = cards;
  }

  get reviewCards() {
    return this.cards.filter((card) => {
      return (!!card.shouldRestudy === false && card.studiedAt > 0);
    });
  }

  get restudyCards() {
    return this.cards.filter((card) => {
      return card.shouldRestudy === true;
    });
  }

  get newCards() {
    return this.cards.filter((card) => {
      return card.studiedAt === null;
    });
  }

  get newOrReviewCards() {
    return this.cards.filter((card) => {
      return (!!card.shouldRestudy === false);
    });
  }

  get nextToStudy() {
    const restudyCards = this.restudyCards;
    const newOrReviewCards = this.newOrReviewCards;

    if (restudyCards.length > 0) {
      return restudyCards[0];
    } else if (newOrReviewCards.length > 0) {
      return newOrReviewCards[Math.floor(Math.random() * newOrReviewCards.length)];
    } else {
      return null;
    }
  }

  removeCard(cardToRemove) {
    return this.cards.filter((card) => {
      return card._id !== cardToRemove._id;
    });
  }

  replaceCard(cardToReplace) {
    return this.cards.map((card) => {
      return (card._id === cardToReplace._id) ? cardToReplace : card;
    });
  }

  updateStudiedCard(card) {
    if (card.shouldRestudy) {
      this.cards = this.replaceCard(card);
    } else {
      this.cards = this.removeCard(card);
    }

    return this.cards;
  }
}

export default CardCollection;
