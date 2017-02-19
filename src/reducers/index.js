const reducer = (state = [], action) => {
  switch (action.type) {
  	case 'ECHO':
    console.log("init called")
  	return {
      ...state
  	}
    case 'START_MATCH':
    console.log("Start Match");
    const shuffleCards = shuffle();
      return {
        ...state,
        players: [{id:0, name: 'Pippo3',  cards: shuffleCards.slice(0,8), points: 0},
        {id:1, name: 'Ugo',  cards: shuffleCards.slice(8,16), points: 0},
        {id:2, name: 'Mario',  cards: shuffleCards.slice(16,24), points: 0},
        {id:3, name: 'John', cards: shuffleCards.slice(24,32), points: 0},
        {id:4, name: 'Franz', cards: shuffleCards.slice(32,40), points: 0}],
        cardsPlayed: [{id:0, value:0},{id:1, value:0},{id:2, value:0},{id:3, value:0},{id:4, value:0}],
        winnerMatch: undefined,
        winnerTurno: undefined,
        inTurn: 0,
        me: 4,
        isMatchFinished: false,
        isTurnFinished: false,
        turns: 1
      }
    case 'CHANGE_TURN':
        console.log("Change Turn");
      return {
      	...state,
      	inTurn: ((state.inTurn++)%5)+1,
        isTurnFinished: state.cardsPlayed.length == 5
    }

    case 'END_TURN':
      console.log("End turn");
      return {
        ...state,
        winnerTurno: 0,
        inTurn: 0,
        isTurnFinished: false,
        cardsPlayed: [{id:0, value:0},{id:1, value:0},{id:2, value:0},{id:3, value:0},{id:4, value:0}],
        turns: state.turns+1,
        isMatchFinished: state.turns == 8
    }
    case 'PLAY':
      console.log("Play");
      return {
        ...state,
        cardsPlayed: [{id:0, value:0},{id:1, value:0},{id:2, value:0},{id:3, value:0},{id:4, value:0}]
      }
    case 'PLAY_BOT':
      console.log("Play_BOT");
      const newCardPlayed =  getRandomValue(state.players, state.inTurn)
      const newCardsPlayed = state.cardsPlayed.map( c => {console.log(c); if(c.id == state.inTurn) { c.value = newCardPlayed; return c;} else { return c; } })
      return {
        ...state,
        cardsPlayed: newCardsPlayed
      }
    case 'SET_WINNER':
      console.log("End Match");
      return {
        ...state,
        winnerMatch: 1
      }
    break;
    default:
      return state
  }
}

function shuffle() {
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

function getRandomValue(players, inTurn) {
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

export default reducer
