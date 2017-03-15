const matchMiddleware = store => next => action => {
  const state = store.getState() // perché ?
	switch(action.type){
		case 'START_MATCH':
			action.shuffleCards = shuffleCards()
      action.cardsPlayed = resetCardsPlayed()
    break
		case 'PLAY':
    break
		case 'PLAY_BOT':
			action.cardsPlayed = playCardOnTheTable(getCardToPlay()),
      action.inTurn = getNextInTurn()
      action.turnFinished = isTurnFinished()
    break
		case 'END_TURN':
			action.winnerTurn = getWinnerTurn(),
  		action.inTurn = getNextInTurn(),
  		action.cardsPlayed = resetCardsPlayed(),
  		action.finishedMatch = isMatchFinished()
  		action.turns = getNextTurn() // increase a value
    break
		case 'SET_WINNER':
			action.winner = setWinnerMatch()
    break
		case 'PLAY_AUCTION_BOT':
			action.inAuction = isUserInAuction(),
			action.auctionForUser = setAuctionForUser(),
      action.inTurn = getNextInTurn()
      action.turnFinished = isTurnFinished()
    break
		case 'PLAY_AUCTION':
    break
		case 'CHANGE_TURN_AUCTION':
			action.inTurn = getNextInTurn(),
  		action.winnerAuction = getWinnerAuction()
    break
		case 'END_AUCTION':
			action.newArea = getArea(),
      action.seed = getSeed()
    break
	}

  function getNextInTurn() {
      var next = (state.inTurn+1)%5
      return next
    }

    function getArea() {
      return 'match';
    }


  function playCardOnTheTable(newCardPlayed){
      var newCardsPlayed = state.match.cardsPlayed
      newCardsPlayed[state.inTurn].value = newCardPlayed
      return newCardsPlayed
    }

    // TODO
    function setWinnerMatch() {
      return 1;
    }

    function isTurnFinished(){
      var res = state.match.cardsPlayed.filter( c => { return c.value == 0 } );
      return res.length == 0
    }

    function isMatchFinished(){
      return (state.match.turns === 8)
    }

    // TODO
    function getWinnerTurn(){
      return 1;
    }

    function resetCardsPlayed() {
      return [{id:0, value:0},{id:1, value:0},{id:2, value:0},{id:3, value:0},{id:4, value:0}]
    }

    function shuffleCards() {
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


    // TODO
    function getCardToPlay() {
      let p = state.players.filter( p => { return p.id == state.inTurn } )[0]
      if(p) {
          // let filteredCards = p.cards.filter(c => { return c !== 0 } )    
          let randomIndex = Math.floor(Math.random() * 7);
          let choosenCard = p.cards[randomIndex];
          // p.cards[randomIndex] = 0;
        return choosenCard;
      }
      return 0
    }


    function getSeed(state) {
      // TODO
      return "coppe"
    }

    function getWinnerAuction() {
      // temp hack to convert an object of object in an array of objects
      state.players = Object.keys(state.players).map(function (key) { return state.players[key]; });
      let playersInAuction = state.players.filter( p => {  return p.auction.isIn === true })
      if( playersInAuction.length == 1) {
        return playersInAuction[0].id
      } else {
        return undefined
      }
    }

    function isUserInAuction(){
      return state.players[state.inTurn].auction.isIn
    }


    function setAuctionForUser() {
      return getAIChoice(state.players[state.inTurn].auction)
    }

    // TODO
    function getAIChoice(auction) {
      let randomIndex = Math.floor(Math.random() * 10);
      if(randomIndex < 5) {
          auction.isIn = false
      } else {
          auction.isIn = true
          auction.points = 85
      }
      return auction
    }

    next(action);
};

  
export default matchMiddleware