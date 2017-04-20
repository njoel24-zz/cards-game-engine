const matchMiddleware = store => next => action => {
  const state = store.getState() // perché ?
	switch(action.type){
    case 'INIT_MATCH':
    action.cardsPlayed = resetCardsPlayed()
    break
		case 'START_MATCH':
			action.shuffleCards = shuffleCards()
      action.cardsPlayed = resetCardsPlayed()
    break
		case 'PLAY':
      action.cardsPlayed = playCardOnTheTable(action.value),
      action.inTurn = getNextInTurn(),
      action.turnFinished = isTurnFinished()
    break
		case 'PLAY_BOT':
			action.cardsPlayed = playCardOnTheTable(),
      action.inTurn = getNextInTurn(),
      action.turnFinished = isTurnFinished()
    break
    case 'CHANGE_TURN':
      action.inTurn = getNextInTurn(),
      action.turnFinished = isTurnFinished()
    break
		case 'END_TURN':
			action.winnerTurn = getWinnerTurn(),
      action.players = getPlayers(action.winnerTurn),
  		action.inTurn = getNextInTurn(),
  		action.cardsPlayed = resetCardsPlayed(),
  		action.finishedMatch = isMatchFinished(),
  		action.turns = getNextTurn() // increase a value
    break
		case 'SET_WINNER':
			action.winner = setWinnerMatch()
    break
		case 'PLAY_AUCTION_BOT':
			action.inAuction = isUserInAuction(),
			action.auctionForUser = setAuctionForUser(),
      action.inTurn = getNextInTurn(),
      action.winnerAuction = getWinnerAuction()
    break
    case 'CHANGE_TURN_AUCTION':
			action.inTurn = getNextInTurn(),
      action.winnerAuction = getWinnerAuction()
    break
		case 'PLAY_AUCTION':
    	action.inAuction = isUserInAuction(),
			action.auctionForUser = setAuctionForUser(action.value),
      action.inTurn = getNextInTurn(),
      action.winnerAuction = getWinnerAuction()
    break
    case 'EXIT_AUCTION':
    	action.inAuction = false,
      action.inTurn = getNextInTurn(),
      action.winnerAuction = getWinnerAuction()
    break
		case 'END_AUCTION':
      action.compagno = getCompagno(),
			action.area = 'match',
      action.seed = getSeed()
    break
	}

  function getPlayers(winnerTurno) {
    return state.players.map(player => {
      if (player.id === winnerTurno.winner) {
        player.points = winnerTurno.totalPoints;
        return player;
      } else {
        return player;
      }
    })
  }

  function getNextInTurn() {
      var next = (state.inTurn+1)%5
      return next
    }

    function getNextTurn() {
      var next = (state.match.turns+1)%9
      return next
    }

    function getCompagno() {
      let compagno = -1
      state.players.map(player => {
        if(player.cards.filter(card => {card === state.auction.compagno}).length > 0) {
          compagno = player.id;
        }
      })
      return compagno;
    }

  function playCardOnTheTable(cardToPlay = null){
      let c = null;
      if (!cardToPlay) {
        c = getCardToPlay()
      } else {
        c = cardToPlay
      }
      var newCardsPlayed = state.match.cardsPlayed
      return newCardsPlayed.map( card => {
        if(card.id == state.inTurn){
          card.value = c
        }
        return card;
      })
    }

    function setWinnerMatch() {
      let team1=0,team2=0;
      for(let i=0; i<state.players.length; i++ ) {
          let player = state.players[i];
          if(player.id === state.auction.winner || player.id === state.auction.compagno) {
            team1 += player.points;
          } else {
            team2 += player.points;
          }
      }
      if(team1 > team2) {
        return "chiamante"
      } else {
        return "others"
      }
    }

    function isTurnFinished(){
      var res = state.match.cardsPlayed.filter( c => { return c.value == 0 } );
      return res.length == 0
    }

    function isMatchFinished(){
      return (state.match.turns === 8)
    }

    function getWinnerTurn(){
      let maxValue = 0;
      let winner =0;
      let totalPoints = 0;
      for( let i = 0; i< state.match.cardsPlayed.length; i++ ) {
          let c = state.match.cardsPlayed[i];
          let valueCurrentcard =  0
          if(state.auction.seed === state.cards[c.value].seme ) {
            valueCurrentcard = state.cards[c.value].value + 100
          } else {
            valueCurrentcard = state.cards[c.value].value
          }
          if(valueCurrentcard > maxValue) {
            
            maxValue = valueCurrentcard
            winner = c.id
          }
          totalPoints += state.cards[c.value].points
      }
      return { winner: winner, totalPoints: totalPoints }
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
          if(choosenCard == 0) {
            choosenCard = 1;
          }
        return choosenCard;
      }
      return 1
    }

    // TODO 
    function getSeed(state) {
      return "coppe"
    }


    function getWinnerAuction() {
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


    function setAuctionForUser(value = null) {
      const biggestAuction = getBiggestAuction(state.players);

      if(value){
        if(value > biggestAuction) {
          state.players[state.inTurn].auction = value
        } else {
          return state.players[state.inTurn].auction
        }
      }

      if(state.players[state.inTurn].auction.isIn === true) {
        return getAIChoice(state.players[state.inTurn].auction, biggestAuction)
      } else {
        return state.players[state.inTurn].auction
      }
    }

    function getBiggestAuction(players) {
      let tmpMax = 0
      players.map((player) => {
        if(player.auction.points > tmpMax ){
          tmpMax = player.auction.points
        } 
      })
      return tmpMax
    }

    // TODO
    function getAIChoice(auction, biggestAuction) {
      
      let tmpVal = Math.floor(Math.random() * 120);
      if(tmpVal < biggestAuction) {
        auction.isIn = false
      } else {
        auction.isIn = true
      }
      auction.points = tmpVal
      
      return auction
    }

    next(action);
};

  
export default matchMiddleware