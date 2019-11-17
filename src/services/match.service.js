import _ from 'lodash'
import { singleton } from './singleton.service';

export class MatchService {

	constructor(store) {
		this.store = store;
		this.auctionService = singleton().create("auction", store);
		this.commonService = singleton().create("common", store);
	}
	
	setWinnerMatch(state) {
		let team1=0,team2=0;
		state.players.map((player) => {
			if(player.id === state.auction.winner || player.id === state.auction.partnerPlayer) {
				team1 += player.points;
			} else {
				team2 += player.points;
			}
		});
		if(team1 > team2) {
			return "chiamante";
		} else {
			return "altri";
		}
	}

	isMatchFinished(state){
		return (state.match.turns === 8);
	}


	isTurnFinished(state){
		const res = state.match.cardsPlayed.filter( c => { return c.value == 0 } );
		return res.length == 1;
	}


	getWinnerTurn(state) {
		let maxValue = 0;
		let winner = 1;
		let totalPoints = 0;
		let startFrom = state.match.winnerTurn ? state.match.winnerTurn : state.matchStarter;

		state.match.cardsPlayed.map((card) => {
			const idCard = card.value;
			const player = card.id;
			let valueCurrentcard = 0;

			if (idCard) {
				if(state.auction.seed === state.cards[idCard].seed ) {
					valueCurrentcard = state.cards[idCard].value + 1000;
				} else if(player===startFrom) {
					valueCurrentcard = state.cards[idCard].value + 100;
				} else if(state.cards[idCard].seed === state.cards[state.match.cardsPlayed[startFrom - 1].id].seed) {
					valueCurrentcard = state.cards[idCard].value + 100;
				}else {
					valueCurrentcard = state.cards[idCard].value;
				}

				if(valueCurrentcard > maxValue) {
					maxValue = valueCurrentcard;
					winner = player;
				} 
				totalPoints += state.cards[idCard].points;
			}
		});
		return { winner: winner, totalPoints: totalPoints };
	}

	playCardOnTheTable(state, cardToPlay){
		let c = null;
		if (!cardToPlay) {
			return this.getCardToPlay(state);
		} else {
			return cardToPlay;
		}
	}

	amITheFirstOne(state) {
		const cardsPlayed = state.match.cardsPlayed;
		return cardsPlayed.filter( c => { return c.value !== 0 } ).length === 0;
	}

	amITheLastOne(state) {
		const cardsPlayed = state.match.cardsPlayed;
		return cardsPlayed.filter( c => { return c.value !== 0 } ).length == 4;
	}

	getCurrentContext(p, state){
		const winnerTmpTurn = this.getWinnerTurn(state).winner;
		return {
			maxValuePlayed: this.getMaxValueFromCardsPlayed(state),
			tmpSumPoints: this.getTmpMaxPointsTurn(state),
			auctionValue:  state.players[state.auction.winner-1].auction.points,
			puntiConsumedByTeam: this.getPuntiConsumedByTeam(state),
			tmpWinnerTeamTurn: winnerTmpTurn,
			lastOneToPlay: this.whichIsTheLastOneToPlay(state),
			isOther: this.isOther(p, state),
			isCaller: this.isCaller(p, state),
			isPartner: this.isPartner(p, state),
			currentTurn: state.match.turns,
			amITheLastOne: this.amITheLastOne(state),
			amItheFirstOne: this.amITheFirstOne(state),
			amIAlreadyWonTheMatch: this.amIAlreadyWonTheMatch(p, state),
			myAllCardsByValue: _.sortBy(this.commonService.getMyAllCards(state, p.cards), ['value']),
			myAllCardsByPoints: _.sortBy(this.commonService.getMyAllCards(state, p.cards), ['points']).reverse(),
			myTeamIsWinningTurn: (this.isOther(p, state) && 
			( winnerTmpTurn !== state.auction.winner && winnerTmpTurn !== state.auction.partnerPlayer ) )
			|| ( (this.isPartner(p, state) || this.isCaller(p, state)) && ( winnerTmpTurn === state.auction.winner || winnerTmpTurn === state.auction.partnerPlayer  ) )
		};
	}

	addPoints(context, state) {
		return context.myAllCardsByPoints.filter((card) => card.seed !== state.auction.seed);
	}

	getStrategy(context, state) {
		// edge cases 
		if(context.amIAlreadyWonTheMatch){
			return this.playSafe(context, state);
		}

		if(context.amItheFirstOne){
			if(context.isOther) {
				const addPoints = this.addPoints(context, state);
				return addPoints.length > 0 ? addPoints[0].id : this.playSafe(context, state);
			} else {
				return this.playSafe(context, state);
			}
		} else if (context.amITheLastOne) {
			if (context.myTeamIsWinningTurn) {
				const addPoints = this.addPoints(context, state);
				return addPoints.length >0  ? addPoints[0].id : this.playSafe(context, state) ;
			} else {
				const tryToWinCard = this.tryToWin(context, state);
			if (!tryToWinCard) {
				return this.playSafe(context, state);
			} else {
				return tryToWinCard;
			} 
			}
		} 
		
		if (context.myTeamIsWinningTurn) {
			const addPoints = this.addPoints(context, state);
			return addPoints.length > 0 ? addPoints[0].id : this.playSafe(context, state);
		} else {
			const tryToWinCard = this.tryToWin(context, state);
			if (!tryToWinCard) {
				return this.playSafe(context, state);
			} else {
				return tryToWinCard;
			}
		}
	}

	getInTurnPlayer(state) {
		return state.players.filter( p => { return p.id == state.inTurn })[0];
	}
	
	getCardToPlay(state) {
		const p = this.getInTurnPlayer(state);
		if(p) {
			const context = this.getCurrentContext(p, state);
			return this.getStrategy(context, state);
		}
		return 1;
	}


	tryToWin(context, state) {
		const filteredArray =  context.myAllCardsByValue.filter((card) => {
			let tmpVal = card.value;
			const firstPlayedSeed = this.getFirstPlayedSeed(state);
			if(firstPlayedSeed && (card.seed === firstPlayedSeed) && (card.seed != state.auction.seed)) {
				tmpVal += 100;
			} else if(card.seed === state.auction.seed){
				tmpVal += 1000;
			}
			if(tmpVal > context.maxValuePlayed) {
				return card;
			}
		});

		if(filteredArray.length) {
			return filteredArray[0].id;
		}
	}


	getFirstPlayedSeed(state) {
		for(let i=0; i<state.match.cardsPlayed.length; i++) {
			const currentIndexCard = state.match.cardsPlayed[i].value;
			const player = state.match.cardsPlayed[i].id;
			if(currentIndexCard > 0 ) {
				if((state.match.winnerTurn) && state.match.winnerTurn === player ) {
					return currentIndexCard;
				} else if (state.auction.winner && state.auction.winner === player ) {
					return currentIndexCard;
				}
			}
		}
	}

	playSafe(context, state){
		return context.myAllCardsByValue.filter((card) => card.seed !== state.auction.seed)[0].id;
	}

	whichIsTheLastOneToPlay(state){
		const lastInFirstTurn = (state.matchStarter - 1)  === 0 ? 5 : (state.matchStarter - 1 );
		const lastInOtherTurn = (state.match.winnerTurn - 1)  === 0 ? 5 : (state.match.winnerTurn - 1 );
		return (state.match.turns === 1) ? lastInFirstTurn : lastInOtherTurn;
	}

	getTmpWinnerMatch(puntiByTeam) {
		return puntiByTeam.allied > puntiByTeam.others ? "allied" : "others";
	}

	getPuntiConsumedByTeam(state) {
		let sumPoints = {allied: 0, others: 0};
		state.players.map(p => {
			if(p.id === state.auction.winner ||  p.id == state.auction.partnerPlayer){
				sumPoints.allied += p.points;
			} else {
				sumPoints.others += p.points;
			}
		});
		return sumPoints;
	}

	isOther(p, state) {
		return !(state.auction.winner === p.id) && !(state.auction.partnerPlayer === p.id);
	}

	isPartner(p, state) {
		return state.auction.partnerPlayer === p.id;
	} 

	isCaller(p, state){
		return state.auction.winner === p.id;
	}

	getProportionValueByPoints (context) {
		const pointsOnTable = context.tmpSumPoints;
		const myOrderedValues = context.myAllCardsByValue;
		
		if (pointsOnTable < 10) {
			return myOrderedValues[0];
		} else if (pointsOnTable < 20) {
			return myOrderedValues[myOrderedValues.length-1];
		} else {
			return myOrderedValues[myOrderedValues.length-1];
		}
	}

	amIAlreadyWonTheMatch(p, state) {
		const auction = this.auctionService.getBiggestAuction(state.players);
		const puntiByTeam = this.getPuntiConsumedByTeam(state);
		if (this.isCaller(p, state) || this.isPartner(p, state) ) {
			return puntiByTeam.alleati > auction;
		} else {
			return puntiByTeam.others > auction;
		}
	}
		
	getTmpMaxPointsTurn(state) {
		let sumPoints = 0;
		state.match.cardsPlayed.map(card => {
			if(card.value > 0 ) {
				sumPoints += state.cards[card.value].points;
			}
		});
		return sumPoints;
	}

	getMaxValueFromCardsPlayed(state) {
		let maxValue = 0;
		let startFrom = state.match.winnerTurn ? state.match.winnerTurn : state.matchStarter;

		state.match.cardsPlayed.map((card) => {
			const idCard = card.value;
			let valueCurrentcard = 0;
			if(idCard) {
				if(state.auction.seed === state.cards[idCard].seed ) {
					valueCurrentcard = state.cards[idCard].value + 1000;
				} else if(card.id === startFrom || state.cards[idCard].seed === state.cards[state.match.cardsPlayed[startFrom - 1].id].seed) {
					valueCurrentcard = state.cards[idCard].value + 100;
				} else {
					valueCurrentcard = state.cards[idCard].value;
				}
				if(valueCurrentcard > maxValue) {
					maxValue = valueCurrentcard;
				}
			}
		});
		return maxValue;
	}
}

export default MatchService;

