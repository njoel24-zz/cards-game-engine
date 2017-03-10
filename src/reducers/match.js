const matchReducer = (state = [], action) => {

  switch (action.type) {

    case 'INIT_MATCH':
      return {
        ...state,
        players: [{id:0, name: 'Pippo3',  cards: [] , points: 0, auction: {points: 0, isIn: true }},
        {id:1, name: 'Ugo',  cards: [], points: 0, auction: {points: 0, isIn: true }},
        {id:2, name: 'Mario',  cards: [], points: 0, auction: {points: 0, isIn: true }},
        {id:3, name: 'John', cards: [], points: 0, auction: {points: 0, isIn: true }},
        {id:4, name: 'Franz', cards: [], points: 0, auction: {points: 0, isIn: true } }],        
        match: {  winner: undefined, winnerTurn: undefined, isTurnFinished: false, turns: 1, cardsPlayed: [] },
        auction: { winner: undefined, seed: undefined },
        isFinished: false,
        inTurn: 0,
        me: 4,
        area: 'auction'
      }

    case 'START_MATCH':
    const shuffleCards = action.shuffleCards;
      return {
        ...state,
        players: [{id:0, name: 'Pippo3',  cards: shuffleCards.slice(0,8), points: 0, auction: {points: 0, isIn: true }},
        {id:1, name: 'Ugo',  cards: shuffleCards.slice(8,16), points: 0, auction: {points: 0, isIn: true }},
        {id:2, name: 'Mario',  cards: shuffleCards.slice(16,24), points: 0, auction: {points: 0, isIn: true }},
        {id:3, name: 'John', cards: shuffleCards.slice(24,32), points: 0, auction: {points: 0, isIn: true }},
        {id:4, name: 'Franz', cards: shuffleCards.slice(32,40), points: 0, auction: {points: 0, isIn: true } }],        
        match: {  winner: undefined, winnerTurn: undefined, isTurnFinished: false, turns: 1, cardsPlayed: action.cardsPlayed },
        auction: { winner: undefined, seed: undefined },
        isFinished: false,
        inTurn: 0,
        me: 4,
        area: 'auction'
      }

    case 'CHANGE_TURN':
      console.log("Change Turn");
      return {
      	...state,
        inTurn: action.getNextInTurn,
        match: {...state.match, isTurnFinished: action.turnFinished }
      }

    case 'END_TURN':
      console.log("End turn");
      return {
        ...state,
        match: { ...state.match, winnerTurn: action.getWinnerTurn,
                 inTurn: action.getNextInTurn,
                 cardsPlayed: action.resetCardsPlayed,
                 turns: action.turns },
        isFinished: action.finishedMatch
      }

    case 'PLAY':
      console.log("Play");
      return {
        ...state
      }

    case 'PLAY_BOT':
      console.log("Play_BOT");
       return {
          ...state,
          match: { ...state.match, cardsPlayed: action.cardsPlayed } 
    }      


    case 'SET_WINNER':
      console.log("End Match");
      return {
        ...state,
        match: { ...state.match,  winner: action.setWinnerMatch }
      }
    break;

     case 'CHANGE_TURN_AUCTION':
      console.log("Change Turn Auction");
      return {
        ...state,
        inTurn: action.inTurn,
        auction: { ...state.auction, winner: action.winnerAuction }
      }

    case 'END_AUCTION':
    console.log("end auction")    
      var newArea = action.getArea;
      return {
        ...state,
        area: newArea,
        auction: { ...state.auction, seed: action.seed }
    }

    case 'PLAY_AUCTION':
      console.log("Play Auction");
      return {
        ...state
    }

    case 'PLAY_AUCTION_BOT':
    console.log("PLAY_AUCTION_BOT:"+ state.inTurn);
      if(action.inAuction) {
        let newPlayers = {...state.players}
        newPlayers[state.inTurn].auction = action.auctionForUser
        return {
          ...state,
          players: newPlayers
        }
      } else {
        return {
          ...state
        }
      }

    default:
      return state
  }
}


export default matchReducer
