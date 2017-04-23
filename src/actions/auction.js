export const playAuction = (value) => ({
  type: 'PLAY_AUCTION',
  value: value
})

export const chooseCompagno = (value = null) => ({
  type: 'CHOOSE_COMPAGNO',
  compagno: value,
  newArea: undefined,
  seed: undefined
})

export const exitAuction = () => ({
  type: 'EXIT_AUCTION'
})

export const changeTurnAuction = () => ({
  type: 'CHANGE_TURN_AUCTION',
  inTurn: undefined,
  winner: undefined
})