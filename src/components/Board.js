import React from 'react'
import { connect } from 'react-redux'
import Players from './Players'
import Common from './Common'
import Me from './Me' 

import { initMatch,  setWinner,  endTurn,
		changeTurn, play, playBot} from '../actions/match'
import { playAuctionBot, 
	 playAuction,
	 endAuction, 
	 changeTurnAuction } from '../actions/auction'

class Board extends React.Component {
	
  render() {
    
    this.prepareAsyncAction(1000)  

    return (
    <div className='board'>
      <Players/>
      <Common />
    	<Me/>
    </div>
    )
  }

  prepareAsyncAction (timeout) {
    if (this.props.isStart && this.props.area === "auction") {
      if (this.props.auction.winner !== undefined) {
        setTimeout(this.props.endAuction.bind(this), timeout);
      } else {
        setTimeout(this.props.playAuctionBot.bind(this), timeout);
      }
    } else if (this.props.isStart && this.props.area === "match") {
      if(this.props.isFinished) {
        setTimeout(this.props.setWinner.bind(this), timeout);
		  } else if(this.props.match.isTurnFinished) {
        setTimeout(this.props.endTurn.bind(this), timeout);
      } else  {
        setTimeout(this.props.playBot.bind(this), timeout);
		  }		  
    } else if (!this.props.isStart && this.props.area === "match") {
      setTimeout(this.props.initMatch.bind(this), timeout);
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
    isFinished: store.isFinished,
  };
}


const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    initMatch: () => {
      dispatch(initMatch());
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
    },
		endTurn: () => {
      dispatch(endTurn());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
