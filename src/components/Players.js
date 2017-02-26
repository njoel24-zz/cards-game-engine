import React from 'react'

class Players extends React.Component {

render () {
  if(!this.context)
    return null;

	let store = this.context.store;

  if(!store.getState().players)
    return null;
  // temp hack to convert an object of object in an array of objects
  store.getState().players = Object.keys(store.getState().players).map(function (key) { return store.getState().players[key]; });
	return (
		<ul className='row'>
    		{store.getState().players.map(player =>
  				<li className='col-xs-1' key={player.id}>{player.name} - {player.auction.points} - {player.auction.isIn}</li>
    		)}
          <li className='col-xs-7'></li>
  		</ul>
		)
	}
}  

Players.contextTypes = {
  store: React.PropTypes.object
}

export default Players
