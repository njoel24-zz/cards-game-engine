import React from 'react'

class Common extends React.Component {

render () {
	if(!this.context)
		return null;

	let store = this.context.store;
	if(!store.getState().match)
		return null;

	return (
		<ul className='row'>
    		{ store.getState().match.cardsPlayed.map(card =>
  				<li className='col-xs-2' key={card.id}>{card.value}</li>
    		)}
				<li className='col-xs-2'></li>
  				<li className='col-xs-2'>turns:{store.getState().match.turns}</li>
  				<li className='col-xs-2'>winner match:{store.getState().match.winner}</li>
  				<li className='col-xs-2'>winner turn:{store.getState().match.winnerTurn}</li>
  				<li className='col-xs-2'>seed:{store.getState().auction.seed}</li>
  				<li className='col-xs-2'>winner auction:{store.getState().auction.winner.toString()}</li>
    		
  		</ul>

		)
	}
}  

Common.contextTypes = {
  store: React.PropTypes.object
}

export default Common
