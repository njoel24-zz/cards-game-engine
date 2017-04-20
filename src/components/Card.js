import React, { Component } from 'react';
import { connect } from 'react-redux'
import { play } from '../actions/match'

export class Card extends React.Component {

play(card){
	dispatch(play(card));
	this.props.card=0;
}	

render () {
	return (
		<div>
		{ this.props.animate ?
        (<img className={(this.props.card === 0) ? 'hidden': 'card'} onClick={this.play.bind(this, this.props.card)}  src={'img/'+this.props.card+'.jpg'} />)
		:
		(<img className={(this.props.card === 0) ? 'hidden': 'card'}  src={'img/'+this.props.card+'.jpg'} />)
		}
		</div>
		)
		
	}
}  
const mapStateToProps = function(store) {
  return {
    match: store.match,
    auction: store.auction,
		isStart: store.isStart
  };
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    play: (card) => {
      dispatch(play(card));
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Card);

