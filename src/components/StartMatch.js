import React from 'react'
import { connect } from 'react-redux'
import { startMatch, setWinner,  endTurn,
		changeTurn, play, playBot} from '../actions/match'
import { playAuctionBot, playAuction, endAuction, changeTurnAuction } from '../actions/auction'

class StartMatch extends React.Component {

	start() {
		this.props.startMatch();
		this.startLoopAuction()
		 // this.startLoop()
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
		
		setTimeout(this.startLoop.bind(this), "1500")
		
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

		// setTimeout("this.startLoopAuction.bind(this)", "1500")
		
	}

	play() {
	}

	render () {
		return (
			<button onClick={this.start.bind(this)}>Start Match</button>
		)
	}

}  

const mapStateToProps = function(store) {
  return {
    match: store.match,
		me: store.me,
		inTurn: store.inTurn,
		auction: store.auction
  };
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    startMatch: function() {
      dispatch(startMatch());
    },
		setWinner: function() {
      dispatch(setWinner());
    },
		playBot: function() {
      dispatch(playBot());
    },
		changeTurn: function() {
      dispatch(changeTurn());
    },
		playAuctionBot: function() {
      dispatch(playAuctionBot());
    },
		changeTurnAuction: function() {
      dispatch(changeTurnAuction());
    },
		endAuction: function() {
      dispatch(endAuction());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartMatch);
