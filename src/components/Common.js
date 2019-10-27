import React from 'react';
import { connect } from 'react-redux';
import { Card } from './Card';
import StartMatch from './StartMatch' ;

class Common extends React.Component {

render () {
	const renderStartMatch = this.getStartMatch()
	return (
		<ul className='row common'>
			{ this.props.match.cardsPlayed.map(card => 
				<li className='col-xs-2' key={card.id}>
						<Card card={card.value}  />
					</li>
			)}
				{ renderStartMatch }
		</ul>

		)
	}

	getStartMatch() {
		if (!this.props.isStart) {
		return  <StartMatch/>
		} else {
		return null
		}
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

