import React from 'react';
import { connect } from 'react-redux';
class Players extends React.Component {

	render () {
		return (
			<ul className='row players'>
				{this.props.players.map(player =>
					<li className='col-xs-2' key={player.id}>
							<div>{player.name}</div>
							<div className={!player.auction.isIn ? 'hidden': ''}> Asta: {player.auction.points}</div>
							<div className={!player.auction.isIn ? 'hidden': 'inAuction'}></div>
							<div> {player.points} Punti</div>
							<div className={(player.id !== this.props.inTurn) ? 'hidden': 'inTurn'}></div>
							<div className={(player.id !== this.props.auction.winner)? 'hidden': ''}>Vincitore Asta!</div>
							<div className={(player.id !== this.props.match.winnerTurn)? 'hidden': 'winnerTurn'}></div>
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
