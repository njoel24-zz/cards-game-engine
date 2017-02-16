import React from 'react'

class Players extends React.Component {

render () {
  console.log("render Players");  
  if(!this.context)
    return null;

	let store = this.context.store;

  if(!store.getState().players)
    return null;

	return (
		<ul className='row'>
    		{store.getState().players.map(player =>
  				<li className='col-xs-1' key={player.id}>{player.name}</li>
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
