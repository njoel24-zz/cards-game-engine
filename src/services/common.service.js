import _ from 'lodash';

export class CommonService {
	constructor(store) {
		this.state = store.getState();
	}
	getNextInTurn(winnerTurn) {
		if (this.state.area == "auction" && this.state.auction.winner !== undefined){
			return this.state.auction.winner;
		}
		if (this.state.area == "match" && this.state.match.isTurnFinished ){
			return winnerTurn.winner;
		}
		const next = (this.state.inTurn+1)%6 > 0 ? (this.state.inTurn+1)%6 : 1;
		return next;
	}

	getNextTurn() {
		const next = (this.state.match.turns+1)%9;
		return next;
	}

	resetCardsPlayed() {
		return [{id:1, value:0},{id:2, value:0},{id:3, value:0},{id:4, value:0},{id:5, value:0}];
	}

	shuffleCards() {
		const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];
		let currentIndex = array.length;
		let temporaryValue=0
		let randomIndex = 0;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	getMyAllCards(cards){
		const allCards = this.state.cards;
		const myAllCards = []
		for(let i=0; i<cards.length; i++){
			if(cards[i]) {
				for (const key in allCards) {
					if(allCards.hasOwnProperty(key)){
						if(allCards[key].id == cards[i]){
							myAllCards.push(allCards[key]);
						}
					}
				}
			}
		}
		return myAllCards;
	}

	addBriscolaValueToMyAllCards(myAllCards) {
		const myNewAllCards = [];
		for(i=0; i<myAllCards.length; i++){
			if(myAllCards[i].seed === this.state.auction.seed){
				const tmpObject = { 
					value: myAllCards[i].value+100, 
					points: myAllCards[i].points, 
					seed: myAllCards[i].seed, 
					name: myAllCards[i].name};
				myNewAllCards.push(tmpObject);
			}else{
				myNewAllCards.push(myAllCards[i]);
			}
		}
	}

	create_UUID(){
		var dt = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (dt + Math.random()*16)%16 | 0;
			dt = Math.floor(dt/16);
			return (c=='x' ? r :(r&0x3|0x8)).toString(16);
		});
		return uuid;
	}
}

export default CommonService;