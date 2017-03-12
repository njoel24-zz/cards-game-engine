import React from 'react'
import { connect } from 'react-redux'
import { startMatch, setWinner,  endTurn,
		changeTurn, play, playBot} from '../actions/match'
import { playAuctionBot, 
	 playAuction,
	 endAuction, 
	 changeTurnAuction } from '../actions/auction'


class StartMatch extends React.Component {

constructor(props) {
	super(props)
	console.log("called")
}

	startLoop() {
		// temporary loop break

		if(this.props.match.isTurnFinished) {
			this.props.endTurn();
		}

		if(this.props.isFinished) {
			this.props.setWinner();
			return;
		}
		
		if(this.props.me != this.props.inTurn) {
			this.props.playBot();
		} else {
			// ui interaction then 
			this.props.playBot();
		}
			
		this.props.changeTurn();
		
		// etTimeout(this.startLoop.bind(this), "1500")
		
	}

	startLoopAuction() {
		if(this.props.me != this.props.inTurn){
			this.props.playAuctionBot();
		}else{
			// ui interaction then 
			this.props.playAuctionBot();
		}
		this.props.changeTurnAuction();
		if(this.props.auction.winner !== undefined) {
			this.props.endAuction();
			return
		} 
	}

	play() {
	}

	startMatch() {
    	this.props.startMatch()
  }

	render () {	
		return (
			<button onClick={ this.props.startMatch}>Start Match</button>
		)
	}
}  

const mapStateToProps = function(store) {
  return {
    match: store.match,
		me: store.me,
		inTurn: store.inTurn,
		auction: store.auction,
		area: store.area
  };
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    startMatch: () => {
      dispatch(startMatch());
    },
		setWinner: () => {
      dispatch(setWinner());
    },
		playBot: () => {
      dispatch(playBot());
    },
		changeTurn: () => {
      dispatch(changeTurn());
    },
		playAuctionBot: () => {
      dispatch(playAuctionBot());
    },
		changeTurnAuction: () => {
      dispatch(changeTurnAuction());
    },
		endAuction: () => {
      dispatch(endAuction());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartMatch);
