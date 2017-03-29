import React from 'react'
import { connect } from 'react-redux'
import { startMatch, setWinner,  endTurn,
		changeTurn, play, playBot} from '../actions/match'
import { playAuctionBot, 
	 playAuction,
	 endAuction, 
	 changeTurnAuction } from '../actions/auction'


class StartMatch extends React.Component {
	render () {	
		return (
			<li className='col-xs-2'> <button onClick={ this.props.startMatch}>Start Match</button> </li>
		)
	}
}  

const mapStateToProps = function(store) {
  return {};
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    startMatch: () => {
      dispatch(startMatch());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartMatch);
