export const initMatch = (matchStarter = 1) => ({
  type: 'INIT_MATCH',
  cardsPlayed: undefined,
  matchStarter: matchStarter
});

export const startMatch = () => ({
  type: 'START_MATCH',
  shuffleCards: undefined
});

export const play = (value = null) => ({
  type: 'PLAY',
  value: value
});

export const changeTurn = () => ({
  type: 'CHANGE_TURN',
  inTurn: undefined
});

export const endTurn = () => ({
  type: 'END_TURN',
  winnerTurn: undefined,
  inTurn: undefined,
  cardsPlayed: undefined,
  finishedMatch: undefined,
  turns: undefined
});

export const setWinner = () => ({
  type: 'SET_WINNER',
  winner: undefined
});