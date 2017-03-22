const matchReducer = (state = [], action) => {

  switch (action.type) {

    case 'INIT_MATCH':
      return {
        players: [
        {id:0, name: 'Pippo3',  cards: [] , points: 0, auction: {points: 0, isIn: true }, team: 2},
        {id:1, name: 'Ugo',  cards: [], points: 0, auction: {points: 0, isIn: true }, team: 2},
        {id:2, name: 'Mario',  cards: [], points: 0, auction: {points: 0, isIn: true }, team: 2},
        {id:3, name: 'John', cards: [], points: 0, auction: {points: 0, isIn: true }, team: 2},
        {id:4, name: 'Franz', cards: [], points: 0, auction: {points: 0, isIn: true }, team: 2 }],        
        match: {  winner: undefined, winnerTurn: undefined, isTurnFinished: false, turns: 1, cardsPlayed: action.cardsPlayed },
        auction: { winner: undefined, seed: undefined },
        isFinished: false,
        inTurn: 0,
        me: 4,
        area: 'auction',
        isStart: false
      }

    case 'START_MATCH':
    const shuffleCards = action.shuffleCards;
      return {
        ...state,
        players: [{...state.players[0],cards: shuffleCards.slice(0,8)},
        {...state.players[1],  cards: shuffleCards.slice(8,16)},
        {...state.players[2],  cards: shuffleCards.slice(16,24)},
        {...state.players[3],  cards: shuffleCards.slice(24,32)},
        {...state.players[4],  cards: shuffleCards.slice(32,40)}],
        isStart: true
      }

    case 'END_TURN':
      console.log("End turn");
      return {
        ...state,
        match: { ...state.match, winnerTurn: action.winnerTurn,
                 inTurn: action.inTurn,
                 cardsPlayed: action.cardsPlayed,
                 turns: action.turns, isTurnFinished: false },
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
          inTurn: action.inTurn,
          match: { ...state.match, cardsPlayed: action.cardsPlayed,isTurnFinished: action.turnFinished }           
      }      

    case 'CHANGE_TURN':
    console.log("Change Turn")
    return {
      ...state,
      inTurn: action.inTurn,
      match: {...state.match, isTurnFinished: action.turnFinished }
    }

    case 'SET_WINNER':
      console.log("End Match");
      return {
        ...state,
        match: { ...state.match,  winner: action.setWinnerMatch },
        isStart: false
      }
    break;

    case 'END_AUCTION':
    console.log("end auction")    
      return {
        ...state,
        area: action.area,
        auction: { ...state.auction, seed: action.seed },
        players: [{...state.players[0], team: action.teams[0]},
        {...state.players[1], team: action.teams[1]},
        {...state.players[2], team: action.teams[2]},
        {...state.players[3], team: action.teams[3]},
        {...state.players[4], team: action.teams[4]}],
    }

    case 'PLAY_AUCTION':
      console.log("Play Auction");
      return {
        ...state
    }

    case 'CHANGE_TURN_AUCTION':
      console.log("Change Turn Auction");
      return {
        ...state,
        inTurn: action.inTurn,
        auction: { ...state.auction, winner: action.winnerAuction }
    }

    case 'PLAY_AUCTION_BOT':
      console.log("PLAY_AUCTION_BOT:"+ state.inTurn+ "isIn:"+action.inAuction);
        let newPlayers = [...state.players]
        newPlayers[state.inTurn].auction = action.auctionForUser
        return {
          ...state,
          inTurn: action.inTurn,
          players: newPlayers,
          auction: { ...state.auction, winner: action.winnerAuction }
        }

    default:
      return state
  }
}


export default matchReducer
