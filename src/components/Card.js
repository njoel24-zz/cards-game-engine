import React from 'react';
import { connect } from 'react-redux';
import { play } from '../actions/match';

export class Card extends React.Component {

	render () {
		this.className = "card";
		if(this.props.class) {
			this.className +=  " "+this.props.class;
		}
		let card = this.props.card;
		if (this.props.card === 0 || this.props.card === undefined) {
			card = "black";
		}

		return (
			<div>
			{ this.props.animate ?
				(<img id={card} className={this.className} onClick={this.props.play} src={'img/'+card+'.jpg'} />)
			:
				(<img className={this.className} src={'img/'+card+'.jpg'} />)
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

