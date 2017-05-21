import React from 'react'
import { connect } from 'react-redux'
import Players from './Players'
import Common from './Common'
import Me from './Me' 

import { initMatch,  setWinner,  endTurn,
		changeTurn, play} from '../actions/match'
import {  
	 playAuction,
	 chooseCompagno, 
	 changeTurnAuction } from '../actions/auction'

class Board extends React.Component {
	
  render() {
    
    if(this.props.inTurn !== this.props.me 
    || (this.props.inTurn === this.props.me && this.props.area === "auction" 
        && !this.props.players[this.props.me].auction.isIn)
        || (this.props.inTurn === this.props.me && this.props.area === "match" 
        && this.props.match.isTurnFinished)) {
      this.prepareAsyncAction(1500)  
    }

    return (
    <div className='board'>
      <img className="logo" src="img/titolo.png"/>
      <Players/>
      <Common />
    	<Me/>
    </div>
    )
  }

  prepareAsyncAction (timeout) {
    var id = window.setTimeout(function() {}, 0);
    while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
    console.log(this.props.players)
    if (this.props.isStart && this.props.area === "auction") {
      if (this.props.auction.winner !== undefined) {
        setTimeout(this.props.chooseCompagno.bind(this), timeout);
      } else {
        setTimeout(this.props.playAuction.bind(this), timeout);
      }
    } else if (this.props.isStart && this.props.area === "match") {
      if(this.props.isFinished) {
        setTimeout(this.props.setWinner.bind(this), timeout);
		  } else if(this.props.match.isTurnFinished) {
        setTimeout(this.props.endTurn.bind(this), timeout);
      } else  {
        setTimeout(this.props.play.bind(this), timeout);
		  }		  
    } else if (!this.props.isStart && this.props.area === "match") {
      console.log(this.props.match.winner);
      // setTimeout(this.props.initMatch.bind(this), timeout);
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
    players: store.players
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
		play: () => {
      dispatch(play());
    },
		changeTurn: () => {
      dispatch(changeTurn());
    },
		playAuction: () => {
      dispatch(playAuction());
    },
		changeTurnAuction: () => {
      dispatch(changeTurnAuction());
    },
		chooseCompagno: () => {
      dispatch(chooseCompagno());
    },
		endTurn: () => {
      dispatch(endTurn());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
