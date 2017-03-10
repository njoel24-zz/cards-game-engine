import React from 'react'
import { connect } from 'react-redux'
class Players extends React.Component {

render () {
	return (
		<ul className='row'>
    		{this.props.players.map(player =>
  				<li className='col-xs-1' key={player.id}>{player.name} - {player.auction.points}</li>
    		)}
          <li className='col-xs-7'></li>
  		</ul>
		)
	}
}

const mapStateToProps = function(store) {
  return {
    players: store.players
  };
}

export default connect(mapStateToProps)(Players);
