import React from 'react'

class Common extends React.Component {

render () {
	if(!this.context)
		return null;
	let store = this.context.store;
	return (
		<ul>
    		{store.getState().cardsPlayed.map(card =>
  				<li key={card.id}>card.name</li>
    		)}
  		</ul>
		)
	}
}  

Common.contextTypes = {
  store: React.PropTypes.object
}

export default Common
