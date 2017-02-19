import React from 'react'

class Common extends React.Component {

render () {
	if(!this.context)
		return null;

	let store = this.context.store;
	if(!store.getState().cardsPlayed)
		return null;

	return (
		<ul className='row'>
    		{store.getState().cardsPlayed.map(card =>
  				<li className='col-xs-2' key={card.id}>{card.value}</li>
    		)}
				<li className='col-xs-2'></li>
  		</ul>
		)
	}
}  

Common.contextTypes = {
  store: React.PropTypes.object
}

export default Common
