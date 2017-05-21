import React, { Component } from 'react';
import { connect } from 'react-redux'
import { play } from '../actions/match'

export class Card extends React.Component {


render () {
	return (
		<div>
		{ this.props.animate ?
        (<img id={this.props.card} className={(this.props.card === 0 || this.props.card === undefined) ? 'hidden': 'card'} onClick={this.props.play}  src={'img/'+this.props.card+'.jpg'} />)
		:
		(<img className={(this.props.card === 0  || this.props.card === undefined) ? 'hidden': 'card'}  src={'img/'+this.props.card+'.jpg'} />)
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
    play: () => {
      dispatch(play(ownProps.card));
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Card);
