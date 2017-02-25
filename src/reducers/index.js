import EngineAuction from './lib/EngineAuction'
import EngineMatch from './lib/EngineMatch'

const reducer = (state = [], action) => {
  engineAuction = new EngineAuction()
  engineMatch = new EngineMatch()

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
        inTurn: engineMatch.getNextInturn(state),
        match: {...state.match, isTurnFinished: engineMatch.isTurnFinished(state) }
      }

    case 'CHANGE_TURN_AUCTION':
      console.log("Change Turn");
      return {
        ...state,
        inTurn: engineAuction.getNextInturn(state),
        auction: { winner: engineAuction.getWinnerAuction(state), seed: engineAuction.getSeed() }
      }

    case 'END_AUCTION':
      newArea = engineAuction.getArea();
      return {
        ...state,
        area: newArea
    }

    case 'END_TURN':
      console.log("End turn");
      return {
        ...state,
        match: { ...state.match, winnerTurn: engineMatch.getWinnerTurn(), inTurn: engineMatch.getNextInTurn(state), cardsPlayed: engineMatch.resetCardsPlayed(),turns: state.turns+1 },
        isFinished: state.turns == 9
      }

    case 'PLAY':
      console.log("Play");
      return {
        ...state,
        cardsPlayed: engineMatch.resetCardsPlayed()
      }

    case 'PLAY_AUCTION':
      console.log("Play Auction");
      return {
        ...state
    }

    case 'PLAY_AUCTION_BOT':
    console.log("PLAY_AUCTION_BOT");

      if(engine.isUserInAuction(state)) {
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
      const newCardsPlayed = engineMatch.playCardOnTheTable(state);
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
