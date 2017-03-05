export const playAuctionBot = () => ({
  type: 'PLAY_AUCTION_BOT',
  newPlayers: undefined,
  inAuction: undefined
})

export const playAuction = () => ({
  type: 'PLAY_AUCTION'
})

export const changeTurnAuction = () => ({
  type: 'CHANGE_TURN_AUCTION',
  inTurn: undefined,
  winner: undefined
})

export const endAuction = () => ({
  type: 'END_AUCTION',
  newArea: undefined,
  seed: undefined
})