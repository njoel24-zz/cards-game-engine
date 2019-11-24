import React from 'react';
import { connect } from 'react-redux';
import Players from './Players';
import RestartMatch from './RestartMatch';
import Common from './Common';
import Me from './Me';
import { setWinner,  endTurn, changeTurn, play} from '../actions/match';
import { playAuction, choosePartner,  changeTurnAuction } from '../actions/auction';

class Board extends React.Component {
	
	render() {
		const ismyTurnInAuctionAndImOutOfAuction = this.props.inTurn === this.props.me && this.props.area === "auction" && !this.props.players[this.props.me - 1].auction.isIn;
		const isNotMyTurn = this.props.inTurn !== this.props.me;
		const isMyTurnInMatchAndTUrnIsFinished = this.props.inTurn === this.props.me && this.props.area === "match" && this.props.match.isTurnFinished;

		if (isNotMyTurn || ismyTurnInAuctionAndImOutOfAuction || isMyTurnInMatchAndTUrnIsFinished) {
			this.prepareAsyncAction(1500);
		}
		return (
			<div className='board'>
				<img className="logo" src="img/titolo.png"/>
				<RestartMatch/>;
				<Players/>
				<Common />
				<Me/>
			</div>
		)
	}

	prepareAsyncAction (timeout) {
		let id = window.setTimeout(function() {}, 0);
		while (id--) {
			window.clearTimeout(id); // will do nothing if no timeout with id is present
		}
		if (this.props.isStart && this.props.area === "auction" && this.props.players.filter((player) => player.auction.isIn).length > 0) {
			if (this.props.auction.winner !== undefined) {
				setTimeout(this.props.choosePartner.bind(this), timeout);
			} else {
				setTimeout(this.props.playAuction.bind(this), timeout);
			}
		} else if (this.props.isStart && this.props.area === "match") {
			if(this.props.isFinished) {
				setTimeout(this.props.setWinner.bind(this), timeout);
			} else if(this.props.match.isTurnFinished) {
				setTimeout(this.props.endTurn.bind(this), timeout);
			} else {
				setTimeout(this.props.play.bind(this), timeout);
			}
		}
	}
}

const mapStateToProps = function(store) {
	return {
		isStart: store.isStart,
		area: store.area,
		match: store.match,
		me: store.me,
		inTurn: store.inTurn,
		auction: store.auction,
		isFinished: store.isFinished,
		players: store.players
	};
}


const mapDispatchToProps = function(dispatch) {
	return {
		setWinner: () => {
			dispatch(setWinner());
		},
		play: () => {
			dispatch(play());
		},
		changeTurn: () => {
			dispatch(changeTurn());
		},
		playAuction: () => {
			dispatch(playAuction());
		},
		changeTurnAuction: () => {
			dispatch(changeTurnAuction());
		},
		choosePartner: () => {
			dispatch(choosePartner());
		},
		endTurn: () => {
			dispatch(endTurn());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
