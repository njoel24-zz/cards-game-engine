import React from 'react'
import { startMatch, setWinner, initMatch, endTurn, endMatch, changeTurn, play, playBot } from '../actions'

class StartMatch extends React.Component {

	start(store) {
		store.dispatch(startMatch())
		this.startLoopAuction(store)
		this.startLoop(store)
	}		

	startLoop(){
		while(store.getState().area == "match" && !store.getState().isFinished) {
			
			if(store.getState().me != store.getState().inTurn) {
				store.dispatch(playBot())
			} else {
				// ui interaction then 
				store.dispatch(play())
			}
			
			store.dispatch(changeTurn())

			if(store.getState().match.isTurnFinished) {
				store.dispatch(endTurn())
			} 
		}

		if(store.getState().isFinished) {
			store.dispatch(setWinner())
		}
	}

	startLoopAuction(store) {
		
		while(!store.getState().area == "auction") {
			
			if(store.getState().me != store.getState().inTurn){
				store.dispatch(playAuctionBot())
			}else{
				// ui interaction then 
				store.dispatch(playAuction())
			}
			
			store.dispatch(changeTurn())

			if(store.getState().auction.winner !== undefined) {
				store.dispatch(endAuction())
			} 
		}
	}

	play(store) {
	}

	render () {
		let store = this.context.store;
		return (
			<button onClick={this.start.bind(this, store)}>Start Match</button>
		)
	}

}  

StartMatch.contextTypes = {
  store: React.PropTypes.object
}

export default StartMatch
