let turn = 0;

const reducer = (state = [], action) => {
  switch (action.type) {
  	case 'INIT':
  	return {
  		players: [{name: 'Pippo', cards: [0,1,2,3,4,5,6,7], points: 0},
  		{name: 'Ugo', cards: [0,1,2,3,4,5,6,7], points: 0},
  		{name: 'Mario', cards: [0,1,2,3,4,5,6,7], points: 0},
  		{name: 'John', cards: [0,1,2,3,4,5,6,7], points: 0},
  		{name: 'Franz', cards: [0,1,2,3,4,5,6,7], points: 0}],
  		cardsPlayed: [],
  		winnerMatch: undefined,
  		winnerTurno: undefined,
  		inTurno: undefined
  	}
    case 'START_MATCH':
      return {
        ...state
      }
      case 'CHANGE_TURNO':
      return {
      	...state,
      	inTurno: ((turn++)%5)+1
      }

    case 'END_TURN':
      return {
        ...state,
        winnerTurno: 1,
        inTurno: winnerTurno
      }
    case 'PLAY':
      return {
        ...state,
        cards: card
      }
    case 'END_MATCH':
    default:
      return state
  }
}

export default reducer
