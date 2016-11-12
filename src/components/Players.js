import React from 'react'

class Players extends React.Component {

render () {
	let store = this.context.store;
	return (
		<ul>
    		{store.getState().players.map(player =>
  				<li key={player.id}>{player.name}
  				<ul>
  				{player.cards.map(card =>
  					<li key={card}>{card}</li>
				)}
  				</ul>
  				</li>
    		)}
  		</ul>
		)
	}
}  

Players.contextTypes = {
  store: React.PropTypes.object
}

export default Players
