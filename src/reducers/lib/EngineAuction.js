class EngineAuction  {

  getArea() {
    return 'match';
  }

  getSeed(state) {
    // TODO
    return "coppe"
  }

  getWinnerAuction(state) {
    let playersInAuction = state.players.filter( p => { return p.auction.inIn == true })
    if( playersInAuction.length == 1) {
      return playersInAuction[0]
    } else {
      return undefined
    }
  }

  isUserInAuction(state){
    return state.players[state.inTurn].auction.isIn
  }

  setAuctionForUser(user) {
    return {points: 80, isIn: true}
  }

}

export default Engine

