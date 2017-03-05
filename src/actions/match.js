export const startMatch = () => ({
  type: 'START_MATCH',
  shuffleCards: undefined
})

export const play = () => ({
  type: 'PLAY'
})

export const playBot = () => ({
  type: 'PLAY_BOT',
  cardPlayed: undefined,
  cardsPlayed: undefined
})

export const changeTurn = () => ({
  type: 'CHANGE_TURN',
  inTurn: undefined
})

export const endTurn = () => ({
  type: 'END_TURN',
  winnerTurn: undefined,
  inTurn: undefined,
  cardsPlayed: undefined,
  finishedMatch: undefined,
  turns: undefined
})

export const setWinner = () => ({
  type: 'SET_WINNER',
  winner: undefined
})