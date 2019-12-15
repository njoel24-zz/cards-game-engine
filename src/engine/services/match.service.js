import _ from 'lodash'
import { singleton } from './singleton.service';

export class MatchService {

	constructor(store) {
		this.store = store;
		this.auctionService = singleton().create("auction", store);
		this.commonService = singleton().create("common", store);
	}
	
	setWinnerMatch(state) {
		const team1Points = state.players.filter((player) => player.id === state.auction.winner || player.id === state.auction.partnerPlayer)
			.reduce((acc, player) => player.points + acc, 0);

		if(team1Points >= this.auctionService.getBiggestAuction(state.players)) {
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
		if(!state.match.cardsPlayed.filter((card) => !!card.value).length) {
			return { winner: startFrom, totalPoints: 0 };
		}
		const seedFirstPlayerInCurrentTurn = state.cards[state.match.cardsPlayed.filter((card) => card.id === startFrom)[0].value].seed;

		state.match.cardsPlayed.map((card) => {
			const idCard = card.value;
			const player = card.id;
			let valueCurrentcard = 0;
			if (idCard) {
				if(state.auction.seed === state.cards[idCard].seed ) {
					valueCurrentcard = state.cards[idCard].value + 1000;
				} else if(player===startFrom) {
					valueCurrentcard = state.cards[idCard].value + 100;
				} else if(state.cards[idCard].seed === seedFirstPlayerInCurrentTurn) {
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

	playCard(state){
		const context = this.getCurrentContext(state.players.filter( p => { return p.id == state.inTurn })[0], state);
		return this.getStrategy(context, state);
	}

	amITheFirstOne(state) {
		const cardsPlayed = state.match.cardsPlayed;
		return cardsPlayed.filter( c => c.value !== 0 ).length === 0;
	}

	amITheSecondOne(state) {
		const cardsPlayed = state.match.cardsPlayed;
		return cardsPlayed.filter( c => c.value !== 0 ).length === 1;
	}

	amITheThirdOne(state) {
		const cardsPlayed = state.match.cardsPlayed;
		return cardsPlayed.filter( c => c.value !== 0 ).length === 2;
	}

	amITheLastOne(state) {
		const cardsPlayed = state.match.cardsPlayed;
		return cardsPlayed.filter( c => c.value !== 0).length == 4;
	}

	getCurrentContext(p, state){
		const winnerTmpTurn = this.getWinnerTurn(state).winner;
		return {
			maxValuePlayed: this.getMaxValueFromCardsPlayed(state),
			isBriscolaPlayed: this.isBriscolaAlreadyPlayed(state),
			tmpSumPoints: this.getTmpMaxPointsTurn(state),
			auctionValue:  state.players[state.auction.winner-1].auction.points,
			puntiConsumedByTeam: this.getPuntiConsumedByTeam(state),
			tmpWinnerTeamTurn: winnerTmpTurn,
			lastOneToPlay: this.getLastOneToPlay(state),
			isOther: this.isOther(p, state),
			isCaller: this.isCaller(p, state),
			isPartner: this.isPartner(p, state),
			currentTurn: state.match.turns,
			amITheLastOne: this.amITheLastOne(state),
			amItheFirstOne: this.amITheFirstOne(state),
			amItheSecondOne: this.amITheSecondOne(state),
			amItheThirdOne: this.amITheThirdOne(state),
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
				return !tryToWinCard? this.playSafe(context, state) : tryToWinCard;
			}
		} else if (context.amITheSecondOne || context.amITheThirdOne) {
			if (context.isCaller || context.isPartner) {
				if (context.isBriscolaPlayed && context.myTeamIsWinningTurn) {
					const addPoints = this.addPoints(context, state);
					return addPoints.length >0  ? addPoints[0].id : this.playSafe(context, state);
				} else if(context.myTeamIsWinningTurn) {
					const tryToWinWithBriscola = this.tryToWinWithBriscola(context, state);
					return !tryToWinWithBriscola ? this.playSafe(context, state) : tryToWinWithBriscola;
				}
			}
		}
		
		if (context.myTeamIsWinningTurn) {
			if(context.isOther && context.lastOneToPlay === state.auction.winner && state.turns < 5 && context.tmpSumPoints > 19) {
				return this.playSafe(context, state);
			} else {
				const addPoints = this.addPoints(context, state);
				return addPoints.length > 0 ? addPoints[0].id : this.playSafe(context, state);
			}
		} else {
			const tryToWinCard = this.tryToWin(context, state);
			if (!tryToWinCard) {
				return this.playSafe(context, state);
			} else {
				return tryToWinCard;
			}
		}
	}

	tryToWinWithBriscola(context, state) {
		const filteredArray =  context.myAllCardsByValue.filter((card) => {
			let tmpVal = card.value;
			 if(card.seed === state.auction.seed){
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

	tryToWin(context, state) {
		const filteredArray =  context.myAllCardsByValue.filter((card) => {
			let tmpVal = card.value;
			const firstPlayedSeed = this.getFirstPlayedSeed(state);
			if(firstPlayedSeed.length && (card.seed === state.cards[firstPlayedSeed[0].value]) && (card.seed != state.auction.seed)) {
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

	isBriscolaAlreadyPlayed(state) {
		return state.match.cardsPlayed.filter((card) => {
			return card.value && state.cards[card.value].seed === state.auction.seed;
		});
	}


	getFirstPlayedSeed(state) {
		return state.match.cardsPlayed.filter((card) => {
			return (card.value && state.match.winnerTurn === card.id || state.auction.winner === card.id);
		});
	}

	playSafe(context){
		return context.myAllCardsByValue[0].id;
	}

	getLastOneToPlay(state){
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

