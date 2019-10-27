import { CommonService } from "./common.service";
import _ from 'lodash';

export class AuctionService {

	constructor(store) {
		this.state = store.getState();
		this.commonService = new CommonService(store);
	}

	choosePartner(card) {
		if(card){
		return this.state.cards[card]
		} else {
		const cardsBySeed = this.getCardsBySeed(this.state.players[this.state.auction.winner].cards)
		const valuesBySeed = {"coppe": 0, "spade": 0, "denari": 0, "bastoni": 0};

		for (const key in cardsBySeed) {
			if(valuesBySeed.hasOwnProperty(key)){
				valuesBySeed[key] = this.getValueFromCardsBySeed(cardsBySeed[key])
			}
		}
		const maxSeed = this.getBiggestSeedValueFromValuesBySeed(valuesBySeed);
		const choosenCard = this.getHighestValuedCardFromBiggestSeed(maxSeed, cardsBySeed)
		return this.state.cards[choosenCard];
		}
	}

	getHighestValuedCardFromBiggestSeed(maxSeed, cardsBySeed) {
		const cards = cardsBySeed[maxSeed]
		for(let i=10; i>=1; i-- ){
			if(cards.filter((card) => {
				return card.value == i;
			}).length==0){
			const allCards = this.state.cards;
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

	getAllied(cardId) {
		for(let i=0; i <this.state.players.length; i++) {
		for(let j=0; j<this.state.players[i].cards.length; j++){
			if(this.state.players[i].cards[j] == cardId)
			return this.state.players[i].id;
		}
		}
	}

	getWinnerAuction() {
		let playersInAuction = this.state.players.filter( p => p.auction.isIn === true );
		if( playersInAuction.length == 1) {
			return playersInAuction[0].id;
		} else {
			return undefined;
		}
	}

	isUserInAuction(){
		return this.state.players[this.state.inTurn].auction.isIn;
	}

	setAuctionForUser(value = null) {
		const biggestAuction = this.getBiggestAuction(this.state.players);

		if(value){
		if(value > biggestAuction) {
			return  {points:value, isIn:true};
		} else {
			return {points:value, isIn:false};
		}
		}

		if(this.state.players[this.state.inTurn].auction.isIn === true) {
			return this.getAIChoice(this.state.players[this.state.inTurn].auction, biggestAuction)
		} else {
			return this.state.players[this.state.inTurn].auction;
		}
	}

	getBiggestAuction(players) {
		let tmpMax = 60;
		players.map((player) => {
		if(player.auction.points > tmpMax ){
			tmpMax = player.auction.points;
		} 
		})
		return tmpMax;
	}

	getAIChoice(auction, biggestAuction) {
		let tmpVal = this.getAuctionValue(this.state.players[this.state.inTurn].cards);
		if(tmpVal < biggestAuction) {
			auction.isIn = false;
			auction.points = tmpVal;
		} else {
			auction.isIn = true;
			auction.points = biggestAuction+5;
		}
		return auction;
	}


	getCardsBySeed(cards) {
		const myAllcards = this.commonService.getMyAllCards(cards)
		const cardsBySeed = {"coppe": [], "spade": [], "denari": [], "bastoni": []}
		myAllcards.map((card) => {
			cardsBySeed[card.seed].push(card)  
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
		let biggestValue = 0
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

	getAuctionValue(cards){
		const cardsBySeed = this.getCardsBySeed(cards)
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