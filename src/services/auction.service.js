import _ from 'lodash';
import { singleton } from './singleton.service';

export class AuctionService {

	constructor(store) {
		this.store = store;
		this.commonService = singleton().create("common", store);
	}

	choosePartner(card, state) {
		if(card){
			return { idCard: state.cards[card], idPlayer: state.me, seed: maxSeed };
		} else {
			const cardsBySeed = this.getCardsBySeed(state, state.players[state.auction.winner-1].cards);
			const valuesBySeed = {"coppe": 0, "spade": 0, "denari": 0, "bastoni": 0};

			for (const key in cardsBySeed) {
				if(valuesBySeed.hasOwnProperty(key)){
					valuesBySeed[key] = this.getValueFromCardsBySeed(cardsBySeed[key]);
				}
			}
			const maxSeed = this.getBiggestSeedValueFromValuesBySeed(valuesBySeed);
			const choosenCard = this.getHighestValuedCardFromBiggestSeed(maxSeed, cardsBySeed, state);
			const compagno = state.players.filter((player) => player.cards.includes(parseInt(choosenCard)))[0];
			return { idCard: choosenCard, idPlayer: compagno.id, seed: maxSeed};
		}
	}

	getHighestValuedCardFromBiggestSeed(maxSeed, cardsBySeed, state) {
		const cards = cardsBySeed[maxSeed];
		for(let i=10; i>=1; i-- ){
			if(cards.filter((card) => {
				return card.value == i;
			}).length==0){
				const allCards = state.cards;
				for (const key in allCards) {
					if(allCards.hasOwnProperty(key)){
						if(allCards[key].value == i && allCards[key].seed == maxSeed){
							return key;
						}
					}
				}
			}
		}
	}

	getWinnerAuction(state) {
		let playersInAuction = state.players.filter( p => p.auction.isIn === true );
		if( playersInAuction.length == 1) {
			return playersInAuction[0].id;
		} else {
			return undefined;
		}
	}

	isUserInAuction(state){
		return state.players[state.inTurn-1].auction.isIn;
	}

	setAuctionForUser(state, value) {
		const biggestAuction = this.getBiggestAuction(state.players);

		if(value){
			if(value > biggestAuction) {
				return  {points:value, isIn:true};
			} else {
				return {points:value, isIn:false};
			}
		}

		if(state.players[state.inTurn-1].auction.isIn === true) {
			return this.getAIChoice(state, biggestAuction);
		} else {
			return state.players[state.inTurn-1].auction;
		}
	}

	getBiggestAuction(players) {
		let tmpMax = 60;
		players.map((player) => {
			if(player.auction.points > tmpMax ){
				tmpMax = player.auction.points;
			} 
		});
		return tmpMax;
	}

	getAIChoice(state, biggestAuction) {
		const auction =  state.players[state.inTurn-1].auction;
		let tmpVal = this.getAuctionValue(state, state.players[state.inTurn-1].cards);
		if(tmpVal < biggestAuction) {
			auction.isIn = false;
			auction.points = tmpVal;
		} else {
			auction.isIn = true;
			auction.points = biggestAuction+5;
		}
		return auction;
	}


	getCardsBySeed(state, cards) {
		const myAllcards = this.commonService.getMyAllCards(state, cards);
		const cardsBySeed = {"coppe": [], "spade": [], "denari": [], "bastoni": []};
		myAllcards.map((card) => {
			cardsBySeed[card.seed].push(card);
		});
		return cardsBySeed;
	}

	getValueFromCardsBySeed(cards) {
		let value = 0;
		cards.map((card) => {
			value += card.value;
		});
		return value;
	}

	getBiggestValueFromCardsBySeed(valueBySeed){
		let biggestValue = 0
		for (const key in valueBySeed) {
			if(valueBySeed.hasOwnProperty(key)){
			if(valueBySeed[key] > biggestValue ){
				biggestValue = valueBySeed[key]
			}
			}
		}
		return biggestValue;
	}

	getBiggestSeedValueFromValuesBySeed(valueBySeed){
		let biggestSeed = null;
		let biggestValue = 0;
		for (const key in valueBySeed) {
			if(valueBySeed.hasOwnProperty(key)){
			if(valueBySeed[key] > biggestValue ){
				biggestValue = valueBySeed[key];
				biggestSeed = key;
			}
			}
		}
		return biggestSeed;
	}

	getAuctionValue(state, cards){
		const cardsBySeed = this.getCardsBySeed(state, cards);
		const valueBySeed = {"coppe": 0, "spade": 0, "denari": 0, "bastoni": 0};
		for (const key in cardsBySeed) {
			if(valueBySeed.hasOwnProperty(key)){
				valueBySeed[key] = this.getValueFromCardsBySeed(cardsBySeed[key]);
			}
		} 

		const maxValue = this.getBiggestValueFromCardsBySeed(valueBySeed);
		let myMaxAuction = 70; 
		if(maxValue >= 20 ){
			myMaxAuction = 70;
		}
		if(maxValue >= 25 ){
			myMaxAuction = 80;
		}
		if(maxValue >= 30 ){
			myMaxAuction = 90;
		}
		if(maxValue >= 35 ){
			myMaxAuction = 100;
		}

		if(maxValue >= 40 ){
			myMaxAuction = 105;
		}

		if(maxValue >= 45 ){
			myMaxAuction = 110;
		}

		if(maxValue == 70 ){
			myMaxAuction = 120;
		}

		return myMaxAuction;

	}

}

export default AuctionService;