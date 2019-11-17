import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import ChoosePoints  from './ChoosePoints';
import ChoosePartner  from './ChoosePartner';

class Me extends React.Component {

	render () {
		return (
			<div>
				<ul className='row me'>
						<li>
							<ChoosePartner show={(this.props.me==this.props.inTurn) && this.props.area == "auction" && this.props.winnerAuction !== undefined }  />
						</li>
						<li>
							<ChoosePoints show={(this.props.me==this.props.inTurn) && this.props.area == "auction"  && this.props.winnerAuction == undefined }  />
						</li>
					{this.props.players[this.props.me - 1].cards.map(c =>
						<li className='col-xs-1' key={c}>
							<Card card={c} animate={(this.props.me==this.props.inTurn) && this.props.area == "match" } />
						</li>
					)}
				</ul>
				<div className='extra-me-data-container'>
					<div className="extra-me-data">
						<div>Compagno</div>
						<Card card={this.props.partnerCard} class="card-mini" animate="false" />
					</div>
					<div className="extra-me-data">
						<div>Vincitore Partita</div>
						<div className="vincitore ">{this.props.winnerMatch}</div>
					</div>
				</div>
			</div>
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
		partnerCard: store.auction.partnerCard,
		winnerMatch: store.match.winner
};
}

export default connect(mapStateToProps)(Me);
