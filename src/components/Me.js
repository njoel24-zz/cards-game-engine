import React from 'react'

class Me extends React.Component {

render () {
	if(!this.context)
		return null;

	let store = this.context.store;
	
	if(!store.getState().players)
		return null;

	return (
		<ul className='row'>
    		{store.getState().players[store.getState().me].cards.map(c =>
  				<li className='col-xs-2' key={c}>{c}</li>
    		)}
				<li className='col-xs-2'></li>
  		</ul>
		)
	}
}  

Me.contextTypes = {
  store: React.PropTypes.object
}

export default Me
