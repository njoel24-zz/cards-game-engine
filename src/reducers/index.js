const reducer = (state = [], action) => {
  switch (action.type) {
  	case 'INIT':
    console.log("init called")
  	return {
  		
  	}
    case 'START_MATCH':
    console.log("Start Match");
      return {
        ...state,
        players: [{id:1, name: 'Pippo3',  cards: [0,1,2,3,4,5,6,7], points: 0},
        {id:2, name: 'Ugo',  cards: [0,1,2,3,4,5,6,7], points: 0},
        {id:3, name: 'Mario',  cards: [0,1,2,3,4,5,6,7], points: 0},
        {id:4, name: 'John', cards: [0,1,2,3,4,5,6,7], points: 0},
        {id:5, name: 'Franz', cards: [0,1,2,3,4,5,6,7], points: 0}],
        cardsPlayed: [],
        winnerMatch: undefined,
        winnerTurno: undefined,
        inTurno: undefined,
        me: undefined
      }
      case 'CHANGE_TURN':
        console.log("Change Turn");
      return {
      	...state,
      	inTurno: ((turn++)%5)+1
      }

    case 'END_TURN':
      console.log("End turn");
      return {
        ...state,
        winnerTurno: 1,
        inTurno: 1
      }
    case 'PLAY':
      console.log("Play");
      return {
        ...state,
        cardsPlayed: []
      }
    case 'END_MATCH':
      console.log("End Match");
    break;
    default:
      return state
  }
}

export default reducer
