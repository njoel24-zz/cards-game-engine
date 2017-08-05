import React from 'react'
import { connect } from 'react-redux'

import Card from './Card'
import  ChoosePoints  from './ChoosePoints'
import  ChoosePartner  from './ChoosePartner'
class Me extends React.Component {

render () {
	return (
		<ul className='row me'>
				<li>
					<ChoosePartner show={(this.props.me==this.props.inTurn) && this.props.area == "auction" && this.props.winnerAuction !== undefined }  />
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
					<div className="partner">Partner</div>
					<Card card={this.props.partner} class="card-mini" animate="false" />
				</li>
				<li className='col-xs-2'>
					<div className="partner">Winner-Vincitore</div>
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
		partner: store.auction.partner,
		winnerMatch: store.match.winner
  };
}

export default connect(mapStateToProps)(Me);
