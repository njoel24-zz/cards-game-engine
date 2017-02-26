import EngineAuction from './lib/EngineAuction'
import EngineMatch from './lib/EngineMatch'

const reducer = (state = [], action) => {
  var engineMatch = new EngineMatch()
  var engineAuction = new EngineAuction()

  switch (action.type) {

  	case 'ECHO':
    console.log("echo called")
  	return state

    case 'START_MATCH':
    console.log("Start Match");
    const shuffleCards = engineMatch.shuffleCards();
      return {
        ...state,
        players: [{id:0, name: 'Pippo3',  cards: shuffleCards.slice(0,8), points: 0, auction: {points: 0, isIn: true }},
        {id:1, name: 'Ugo',  cards: shuffleCards.slice(8,16), points: 0, auction: {points: 0, isIn: true }},
        {id:2, name: 'Mario',  cards: shuffleCards.slice(16,24), points: 0, auction: {points: 0, isIn: true }},
        {id:3, name: 'John', cards: shuffleCards.slice(24,32), points: 0, auction: {points: 0, isIn: true }},
        {id:4, name: 'Franz', cards: shuffleCards.slice(32,40), points: 0, auction: {points: 0, isIn: true } }],        
        match: {  winner: undefined, winnerTurn: undefined, isTurnFinished: false, turns: 1, cardsPlayed: engineMatch.resetCardsPlayed() },
        auction: { winner: 0, seed: undefined },
        isFinished: false,
        inTurn: 0,
        me: 4,
        area: 'auction'
      }
    case 'CHANGE_TURN':
        console.log("Change Turn");
      return {
      	...state,
        inTurn: engineMatch.getNextInTurn(state.inTurn),
        match: {...state.match, isTurnFinished: engineMatch.isTurnFinished(state) }
      }

    case 'CHANGE_TURN_AUCTION':
      console.log("Change Turn Auction");
      var inTurn = engineAuction.getNextInTurn(state.inTurn)
      return {
        ...state,
        inTurn: inTurn,
        auction: { winner: engineAuction.getWinnerAuction(state), seed: engineAuction.getSeed() },
        match: {...state.match, cardsPlayed: engineMatch.resetCardsPlayed()}
      }

    case 'END_AUCTION':
    console.log("end auction")    
    console.log("vince l'asta: "+engineAuction.getWinnerAuction(state))
      var newArea = engineAuction.getArea();
      return {
        ...state,
        area: newArea
    }

    case 'END_TURN':
      console.log("End turn");
      console.log("number of turns played:"+state.match.turns)
      return {
        ...state,
        match: { ...state.match, winnerTurn: engineMatch.getWinnerTurn(state), inTurn: engineMatch.getNextInTurn(state.inTurn), cardsPlayed: engineMatch.resetCardsPlayed(),turns: state.match.turns+1 },
        isFinished: engineMatch.isMatchFinished(state)
      }

    case 'PLAY':
      console.log("Play");
      return {
        ...state
      }

    case 'PLAY_AUCTION':
      console.log("Play Auction");
      return {
        ...state
    }

    case 'PLAY_AUCTION_BOT':
    console.log("PLAY_AUCTION_BOT:"+ state.inTurn);
      if(engineAuction.isUserInAuction(state)) {
        let newPlayers = {...state.players}
        newPlayers[state.inTurn].auction = engineAuction.setAuctionForUser(newPlayers[state.inTurn].auction)
        return {
          ...state,
          players: newPlayers
        }
      } else {
        return {
          ...state
        }
      }

    case 'PLAY_BOT':
      console.log("Play_BOT");
      const newCardPlayed =  engineMatch.getCardToPlay(state.players, state.inTurn)
      const newCardsPlayed = engineMatch.playCardOnTheTable(state, newCardPlayed);
      console.log("il bot gioca:"+ newCardPlayed)
      console.log("gioca il bot. New cards played:")
      console.log(newCardsPlayed)
        return {
          ...state,
          match: { ...state.match, cardsPlayed: newCardsPlayed } 
        }
      
    case 'SET_WINNER':
      console.log("End Match");
      return {
        ...state,
        match: { ...state.match,  winner: engineMatch.setWinnerMatch(state) }
      }
    break;

    default:
      return state
  }
}


export default reducer
