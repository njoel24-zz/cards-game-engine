import React from 'react';
import { connect } from 'react-redux';
import { Card } from './Card';

class Common extends React.Component {

	render () {
		return (
			<ul className='row common'>
				{ this.props.match.cardsPlayed.map(card => 
					<li className='col-xs-2' key={card.id}>
							<Card card={card.value} />
						</li>
				)}
			</ul>
		)
	}
}

const mapStateToProps = function(store) {
	return {
		match: store.match,
		auction: store.auction,
		isStart: store.isStart
	};
}

export default connect(mapStateToProps)(Common);

