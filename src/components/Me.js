import React from 'react'
import { connect } from 'react-redux'

import { Card } from './Card'
class Me extends React.Component {

render () {
	return (
		<ul className='row common-cards'>
    		{this.props.players[this.props.me].cards.map(c =>
  				<li className='col-xs-1' key={c}>
							<Card src={'img/'+c+'.jpg'} />
					</li>
    		)}
				<li className='col-xs-2'>Timer</li>
				<li className='col-xs-2'>Info</li>
  	</ul>
		)
	}
}  

const mapStateToProps = function(store) {
  return {
    players: store.players,
		me: store.me
  };
}

export default connect(mapStateToProps)(Me);
