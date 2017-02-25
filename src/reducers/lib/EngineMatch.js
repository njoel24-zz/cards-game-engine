class EngineMatch  {

  playCardOnTheTable(state){
    state.match.cardsPlayed.map( c => { 
      if(c.id == state.inTurn) { 
        c.value = newCardPlayed; return c;
      } else { 
        return c; 
      } 
    })
  }


  setWinnerMatch() {
    return 1;
  }



  isTurnFinished(state){
    state.cardsPlayed.filter( c => { return c.value != 0 } )[0] == 0
  }

  getWinnerTurn(){

  }

  getNextInTurn(state) {
    return ((state.inTurn++)%5)
  }


  resetCardsPlayed() {
    return [{id:0, value:0},{id:1, value:0},{id:2, value:0},{id:3, value:0},{id:4, value:0}]
  }

  shuffleCards() {
    let array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  getCardToPlay(players, inTurn) {
    let p = players.filter( p => { return p.id == inTurn } )[0]
    if(p) {
      let filteredCards = p.cards.filter(c => { return c !== 0 } )    
      let randomIndex = Math.floor(Math.random() * filteredCards.length-1);
      let choosenCard = p.cards[randomIndex];
      p.cards[randomIndex] = 0;
    return choosenCard;
    }
   return 0
  }

}

export default Engine
