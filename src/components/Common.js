import React from 'react'

class Common extends React.Component {

render () {
	if(!this.context)
		return null;

	let store = this.context.store;
  if(!store.getState())
    return null
	if(!store.getState().match || !store.getState().match.cardsPlayed)
		return null;
  let winner = null
  if( store.getState().match.winner){
    winner = store.getState().match.winner.toString()
  }

	return (
		<ul className='row'>
    		{ store.getState().match.cardsPlayed.map(card =>
  				<li className='col-xs-2' key={card.id}><img src={'img/'+card.value+'.jpg'} className='card'/></li>
    		)}
				<li className='col-xs-2'></li>
  				<li className='col-xs-2'>turns:{store.getState()-match.turns}</li>
  				<li className='col-xs-2'>winner match:{store.getState().match.winner}</li>
  				<li className='col-xs-2'>winner turn:{store.getState().match.winnerTurn}</li>
  				<li className='col-xs-2'>seed:{store.getState().auction.seed}</li>
  				<li className='col-xs-2'>winner auction:{winner}</li>
    		
  		</ul>

		)
	}
}  

Common.contextTypes = {
  store: React.PropTypes.object
}

export default Common
