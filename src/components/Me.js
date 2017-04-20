import React from 'react'
import { connect } from 'react-redux'

import { Card } from './Card'
import  ChoosePoints  from './ChoosePoints'
class Me extends React.Component {

render () {
	return (
		<ul className='row me'>
				<li>
					<ChoosePoints show={(this.props.me==this.props.inTurn) && this.props.area == "auction" }  />
				</li>
    		{this.props.players[this.props.me].cards.map(c =>
  				<li className='col-xs-1' key={c}>
							<Card card={c} animate={(this.props.me==this.props.inTurn) && this.props.area == "match" } />
					</li>
    		)}
				<li className='col-xs-2'>Info</li>
  	</ul>
		)
	}
}  

const mapStateToProps = function(store) {
  return {
    players: store.players,
		me: store.me,
		inTurn: store.inTurn,
		area: store.area
  };
}

export default connect(mapStateToProps)(Me);
