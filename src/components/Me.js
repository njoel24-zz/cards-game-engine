import React from 'react'
import { connect } from 'react-redux'
class Me extends React.Component {

render () {
	return (
		<ul className='row'>
    		{this.props.players[this.props.me].cards.map(c =>
  				<li className='col-xs-2' key={c}><img src={'img/'+c+'.jpg'} className='card'/></li>
    		)}
				<li className='col-xs-2'></li>
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
