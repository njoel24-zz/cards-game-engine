import cards from "../constants/cards"

const matchReducer = (state = [], action) => {

  switch (action.type) {

    case 'INIT_MATCH':
      return {
        players: [
        {id:0, name: 'Pippo3',  cards: [] , points: 0, auction: {points: 0, isIn: true }},
        {id:1, name: 'Ugo',  cards: [], points: 0, auction: {points: 0, isIn: true }},
        {id:2, name: 'Mario',  cards: [], points: 0, auction: {points: 0, isIn: true }},
        {id:3, name: 'John', cards: [], points: 0, auction: {points: 0, isIn: true }},
        {id:4, name: 'Franz', cards: [], points: 0, auction: {points: 0, isIn: true }}],        
        match: {  winner: undefined, winnerTurn: undefined, isTurnFinished: false, turns: 1, cardsPlayed: action.cardsPlayed },
        auction: { winner: undefined, seed: undefined, compagno:  undefined },
        isFinished: false,
        inTurn: 0,
        me: 4,
        area: 'auction',
        isStart: false,
        alleato: undefined,
        cards: cards
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
      newPlayers = [...state.players]
      newPlayers[action.winnerTurn.winner].points += action.winnerTurn.totalPoints
      return {
        ...state,
        match: { ...state.match, 
                 winnerTurn: action.winnerTurn.winner,
                 cardsPlayed: action.cardsPlayed,
                 turns: action.turns, isTurnFinished: false },
                players: newPlayers,
                isFinished: action.finishedMatch,
                inTurn: action.inTurn
      }

    case 'PLAY':
      console.log("Play");
      newPlayers = [...state.players]
      newPlayers[state.inTurn].cards = newPlayers[state.inTurn].cards.map((card) => {
        if(card!==action.cardPlayed) {
          return card
        }
      }) 

      let  newCardsPlayed = [...state.match.cardsPlayed]
      newCardsPlayed[state.inTurn].value = action.cardPlayed

      return {
        ...state,
          players: newPlayers,
          inTurn: action.inTurn,
          match: { ...state.match, cardsPlayed: newCardsPlayed, isTurnFinished: action.turnFinished }           
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
        match: { ...state.match,  winner: action.winner },
        isStart: false
      }


    case 'PLAY_AUCTION':
      console.log("Play Auction");
      newPlayers = [...state.players]
        newPlayers[state.inTurn].auction = action.auctionForUser
        return {
          ...state,
          inTurn: action.inTurn,
          players: newPlayers,
          auction: { ...state.auction, winner: action.winnerAuction }
    }

   case 'CHOOSE_COMPAGNO':
      console.log("Choose Compagno");
        return {
         ...state,
         inTurn: action.inTurn,
         area: action.area,
         alleato: action.alleato,
         auction: { ...state.auction, compagno: action.compagno, seed: action.seed }
    }

    case 'PLAY_AUCTION':
      console.log("Play Auction");
      newPlayers = [...state.players]
        newPlayers[state.inTurn].auction = action.auctionForUser
        return {
          ...state,
          inTurn: action.inTurn,
          players: newPlayers,
          auction: { ...state.auction, winner: action.winnerAuction }
    }

    case 'EXIT_AUCTION':
      console.log("Exit Auction");
      let newPlayers = [...state.players]
      newPlayers[state.inTurn].auction.isIn = action.inAuction
      return {
        ...state,
        players: newPlayers,
        inTurn: action.inTurn,
        auction: { ...state.auction, winner: action.winnerAuction }
    }

    case 'CHANGE_TURN_AUCTION':
      console.log("Change Turn Auction");
      return {
        ...state,
        inTurn: action.inTurn,
        auction: { ...state.auction, winner: action.winnerAuction }
    }

    

    default:
      return state
  }
}


export default matchReducer
