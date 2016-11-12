import React from 'react'

class Players extends React.Component {

render () {
	return (
		<ul>
    		{this.props.players.map(player =>
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

export default Players
