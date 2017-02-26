import EngineCommon from './EngineCommon'

class EngineAuction extends EngineCommon  {

  constructor() {
    super()
  }

  getSeed(state) {
    // TODO
    return "coppe"
  }

  getWinnerAuction(state) {
    // temp hack to convert an object of object in an array of objects
    state.players = Object.keys(state.players).map(function (key) { return state.players[key]; });
    let playersInAuction = state.players.filter( p => {  return p.auction.isIn === true })
    if( playersInAuction.length == 1) {
      return playersInAuction[0].id
    } else {
      return 0
    }
  }

  isUserInAuction(state){
    return state.players[state.inTurn].auction.isIn
  }

  setAuctionForUser(auction) {
    return this.getAIChoice(auction)
  }

  // TODO
  getAIChoice(auction) {
    let randomIndex = Math.floor(Math.random() * 10);
    if(randomIndex < 5) {
      auction.isIn = false
    }else {
      auction.isIn = true
      auction.points = 85
    }
    return auction
  }

}

export default EngineAuction

