import React from 'react'
import { connect } from 'react-redux'
class Common extends React.Component {

render () {
	return (
		<ul className='row'>
    		{ this.props.match.cardsPlayed.map(card =>
  				<li className='col-xs-2' key={card.id}><img src={'img/'+card.value+'.jpg'} className='card'/></li>
    		)}
				<li className='col-xs-2'></li>
  				<li className='col-xs-2'>turns:{this.props.match.turns}</li>
  				<li className='col-xs-2'>winner match:{this.props.match.winner}</li>
  				<li className='col-xs-2'>winner turn:{this.props.match.winnerTurn}</li>
  				<li className='col-xs-2'>seed:{this.props.auction.seed}</li>
  				<li className='col-xs-2'>winner auction:{this.props.auction.winner}</li>    		
  	 </ul>
		)
	}
}  

const mapStateToProps = function(store) {
  return {
    match: store.match,
    auction: store.auction
  };
}

export default connect(mapStateToProps)(Common);

