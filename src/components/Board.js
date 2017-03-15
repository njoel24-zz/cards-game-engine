import React from 'react'
import { connect } from 'react-redux'
import Players from './Players'
import Common from './Common'
import StartMatch from './StartMatch' 
import Me from './Me' 

import { startMatch, setWinner,  endTurn,
		changeTurn, play, playBot} from '../actions/match'
import { playAuctionBot, 
	 playAuction,
	 endAuction, 
	 changeTurnAuction } from '../actions/auction'

class Board extends React.Component {
	
  render() {
    // workaround to avoid infinite loop on StartMatch
    var renderStartMatch = this.getStartMatch()
    this.prepareAsyncAction(3000)  

    return (
    <div className='container'>
      <Common />
    	<Players/>
    	<Me/>
      { renderStartMatch }
    </div>
    )
  }

  prepareAsyncAction (timeout) {
    if (this.props.isStart && this.props.area === "auction") {
      if(this.props.auction.winner === undefined) {
        setTimeout(this.props.playAuctionBot.bind(this), timeout);
      }else {
        setTimeout(this.props.endAuction.bind(this), timeout);
      }
    } else if (this.props.isStart && this.props.area === "match") {

      if(this.props.isFinished) {
        setTimeout(this.props.setWinner.bind(this), timeout);
		  }

      if(this.props.match.isTurnFinished) {
        setTimeout(this.props.endTurn.bind(this), timeout);
		  }
		
      if(!this.props.isFinished) {
        setTimeout(this.props.playBot.bind(this), timeout);
      }
		  
    }
  }

  getStartMatch() {
    var renderHtml = ""
    if (!this.props.isStart) {
      return  <StartMatch/>  
    } else {
      return null
    }
  }

}

const mapStateToProps = function(store) {
  return {
    isStart: store.isStart,
    area: store.area,
    match: store.match,
		me: store.me,
		inTurn: store.inTurn,
		auction: store.auction,
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

export default connect(mapStateToProps, mapDispatchToProps)(Board);
