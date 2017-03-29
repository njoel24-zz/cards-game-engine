import React from 'react'
import { connect } from 'react-redux'
class Players extends React.Component {

render () {
	return (
		<ul className='row player-info'>
    		{this.props.players.map(player =>
  				<li className='col-xs-2' key={player.id}>
						<div>Name: {player.name}</div>
						<div>Auction: {player.auction.points}</div>
						<div className={!player.auction.isIn ? 'hidden': ''}>In Auction</div>
						<div>Points: {player.points}</div>
						<div className={(player.id !== this.props.inTurn) ? 'hidden': ''}>inTurn</div>
						<div className={(player.id !== this.props.match.winner)? 'hidden': ''}>Winner</div>
						<div className={(player.id !== this.props.auction.winner)? 'hidden': ''}>WinnerAuction</div>
						<div className={(player.id !== this.props.auction.compagno)? 'hidden': ''}>compagno</div>
						<div className={(player.id !== this.props.match.winnerTurn)? 'hidden': ''}>winnerTurn</div>
					</li>
    		)}
  		</ul>
		)
	}
}

const mapStateToProps = function(store) {
  return {
    players: store.players,
		inTurn: store.inTurn,
		match: store.match,
		auction: store.auction
  };
}

export default connect(mapStateToProps)(Players);
