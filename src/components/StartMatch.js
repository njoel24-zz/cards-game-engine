import React from 'react'
import { startMatch, setWinner, initMatch, endTurn, endMatch,
		changeTurn, play, playBot, playAuctionBot, playAuction, endAuction, changeTurnAuction } from '../actions'

class StartMatch extends React.Component {

	start() {
		let store = this.context.store;
		store.dispatch(startMatch())
		this.startLoopAuction()
		this.startLoop()
	}		

	sleep(ms) {
    	var unixtime_ms = new Date().getTime();
    	while(new Date().getTime() < unixtime_ms + ms) {}
	}

	startLoop() {
		// temporary loop break
		let store = this.context.store;

		if(store.getState().match.isTurnFinished) {
			store.dispatch(endTurn())
		}

		if(store.getState().isFinished) {
			store.dispatch(setWinner())
			return;
		}
		
		if(store.getState().me != store.getState().inTurn) {
			store.dispatch(playBot())
		} else {
			// ui interaction then 
			store.dispatch(playBot())
		}
			
		store.dispatch(changeTurn())
		
		
		setTimeout(this.startLoop.bind(this), "1500")
		
	}

	startLoopAuction() {
		
		let store = this.context.store;
		console.log("store:"+store.getState().inTurn)
		if(store.getState().me != store.getState().inTurn){
			store.dispatch(playAuctionBot())
		}else{
			// ui interaction then 
			store.dispatch(playAuctionBot())
		}
			
		console.log("prima:"+store.getState().inTurn)
		store.dispatch(changeTurnAuction())
		console.log("dopo:"+store.getState().inTurn)

		if(store.getState().auction.winner !== undefined) {
			store.dispatch(endAuction())
			return
		} 

		// setTimeout(this.startLoopAuction.bind(this), "1500")
		
	}

	play() {
	}

	render () {
		let store = this.context.store;
		return (
			<button onClick={this.start.bind(this)}>Start Match</button>
		)
	}

}  

StartMatch.contextTypes = {
  store: React.PropTypes.object
}

export default StartMatch
