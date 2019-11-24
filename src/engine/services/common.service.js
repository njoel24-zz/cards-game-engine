import _ from 'lodash';

export class CommonService {
	constructor(store) {
		this.store = store;
	}
	getNextInTurn(state, winnerTurn) {
		if (state.area == "auction" && state.auction.winner !== undefined){
			return state.auction.winner;
		}
		if (state.area == "match" && state.match.isTurnFinished ){
			return winnerTurn.winner;
		}
		const next = (state.inTurn+1)%6 > 0 ? (state.inTurn+1)%6 : 1;
		return next;
	}

	getNextTurn(state) {
		const next = (state.match.turns+1)%9;
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

	getMyAllCards(state, cards){
		return Object.values(state.cards).filter((c) => cards.includes(c.id));
	}
}

export default CommonService;