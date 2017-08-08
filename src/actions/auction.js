export const playAuction = (value) => ({
  type: 'PLAY_AUCTION',
  value: value
})

export const raiseAuction = () => ({
  type: 'RAISE_AUCTION'
})

export const choosePartner = (value = null) => ({
  type: 'CHOOSE_PARTNER',
  partner: value,
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