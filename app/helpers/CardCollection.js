class CardCollection {
  construction(cards) {
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

    removeCard(card) {
      return this.cards.filter(function (card) {
        return card._id !== action.cardId;
      });
    }
}

export default CardCollection;
