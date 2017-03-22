import cards from "../constants/cards";

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
      action.inTurn = getNextInTurn(),
      action.winnerAuction = getWinnerAuction()
    break
    case 'CHANGE_TURN_AUCTION':
			action.inTurn = getNextInTurn(),
      action.winnerAuction = getWinnerAuction()
    break
		case 'PLAY_AUCTION':
    break
		case 'END_AUCTION':
			action.area = getArea(),
      action.seed = getSeed(),
      action.teams = getTeams()
    break
	}

  function getNextInTurn() {
      var next = (state.inTurn+1)%5
      return next
    }

    function getNextTurn() {
      var next = (state.match.turns+1)%9
      return next
    }

    function getArea() {
      return 'match';
    }

    function getTeams() {
      return [1,1,2,2,2];
    }

  function playCardOnTheTable(){
      let c = getCardToPlay()
      var newCardsPlayed = state.match.cardsPlayed
      return newCardsPlayed.map( card => {
        if(card.id == state.inTurn){
          card.value = c
        }
        return card;
      })
    }

    // TODO
    function setWinnerMatch() {
      let team1=0,team2=0;
      for(let i=0; i<state.players.length; i++ ) {
          let player = state.players[i];
          if(player.team === 1) {
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
      return res.length == 1
    }

    function isMatchFinished(){
      return (state.match.turns === 8)
    }

    // TODO
    function getWinnerTurn(){
      let max = 0;
      let winner =0;
      let totalPoints = 0;
      for( let i = 0; i< state.match.cardsPlayed.length; i++ ) {
          let c = state.match.cardsPlayed[i];
          if(c.value > max) {
            max = cards[c.value].value
            winner = c.id
          }
          totalPoints += cards[c.value].points
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


    function getSeed(state) {
      // TODO
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


    function setAuctionForUser() {

      if(state.players[state.inTurn].auction.isIn === true) {
        const biggestAuction = getBiggestAuction(state.players);
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