import React from 'react'
import { connect } from 'react-redux'

import Card from './Card'
import  ChoosePoints  from './ChoosePoints'
import  ChooseCompagno  from './ChooseCompagno'
class Me extends React.Component {

render () {
	return (
		<ul className='row me'>
				<li>
					<ChooseCompagno show={(this.props.me==this.props.inTurn) && this.props.area == "auction" && this.props.winnerAuction !== undefined }  />
				</li>
				<li>
					<ChoosePoints show={(this.props.me==this.props.inTurn) && this.props.area == "auction"  && this.props.winnerAuction == undefined }  />
				</li>
    		{this.props.players[this.props.me].cards.map(c =>
  				<li className='col-xs-1' key={c}>
							<Card card={c} animate={(this.props.me==this.props.inTurn) && this.props.area == "match" } />
					</li>
    		)}
				<li className='col-xs-2'>
					<div className="compagno">Compagno</div>
					<Card card={this.props.compagno} class="card-mini" animate="false" />
				</li>
				<li className='col-xs-2'>
					<div className="compagno">Vincitore</div>
					<div className="card card-mini ">{this.props.winnerMatch}</div>
				</li>
  	</ul>
		)
	}
}  

const mapStateToProps = function(store) {
  return {
    players: store.players,
		me: store.me,
		inTurn: store.inTurn,
		area: store.area,
		winnerAuction: store.auction.winner,
		seed: store.auction.seed,
		compagno: store.auction.compagno,
		winnerMatch: store.match.winner
  };
}

export default connect(mapStateToProps)(Me);
