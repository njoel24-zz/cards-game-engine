import _ from 'lodash';
import { singleton } from '../services/singleton.service';
const matchMiddleware = store => next => action => {
	const state = store.getState();
	const commonService = singleton().create("common", store);
	const matchService = singleton().create("match", store);
	const auctionService= singleton().create("auction", store);
	switch(action.type){
		case 'INIT_MATCH':
			action.cardsPlayed = commonService.resetCardsPlayed();
		break;
		case 'START_MATCH':
			action.shuffleCards = commonService.shuffleCards();
			action.cardsPlayed = commonService.resetCardsPlayed();
			action.inTurn = ((state.matchStarter + 1) % 5);
		break;
		case 'PLAY':
			let card = action.value;
			if(!card) {
				card = matchService.playCard(state);
			}
			action.cardPlayed = card;
			action.inTurn = commonService.getNextInTurn(state);
			action.turnFinished = matchService.isTurnFinished(state);
		break;
		case 'CHANGE_TURN':
			action.inTurn = commonService.getNextInTurn(state);
			action.turnFinished = matchService.isTurnFinished(state);
		break;
		case 'END_TURN':
			const winnerTurn = matchService.getWinnerTurn(state);
			action.winnerTurn = winnerTurn;
			action.inTurn = commonService.getNextInTurn(state, winnerTurn);
			action.cardsPlayed = commonService.resetCardsPlayed();
			action.turnFinished = false;
			action.turns = commonService.getNextTurn(state);
			action.finishedMatch = matchService.isMatchFinished(state);
		break;
		case 'SET_WINNER':
			action.winner = matchService.setWinnerMatch(state);
			action.cardsPlayed = commonService.resetCardsPlayed();
		break;
		case 'CHANGE_TURN_AUCTION':
			action.inTurn = commonService.getNextInTurn(state);
			action.winnerAuction = auctionService.getWinnerAuction(state);
		break;
		case 'PLAY_AUCTION':
			action.inAuction = auctionService.isUserInAuction(state);
			action.auctionForUser = auctionService.setAuctionForUser(state, action.value);
			action.inTurn = commonService.getNextInTurn(state);
			action.winnerAuction = auctionService.getWinnerAuction(state);
		break;
		case 'RAISE_AUCTION':
			action.inAuction = auctionService.isUserInAuction(state);
			let raisedAuction = auctionService.getBiggestAuction(state.players) + 5;
			if(raisedAuction > 120 ){
				raisedAuction = 120;
			}
			action.auctionForUser = auctionService.setAuctionForUser(state, raisedAuction);
			action.inTurn = commonService.getNextInTurn(state);
			action.winnerAuction = auctionService.getWinnerAuction(state);
		break;
		case 'CHOOSE_PARTNER':
			const choice = auctionService.choosePartner(action.partner, state);
			action.partnerPlayer = choice.idPlayer;
			action.partnerCard = choice.idCard;
			action.inTurn = state.matchStarter;
			action.area = 'match';
			action.seed = choice.seed;
		break;
		case 'EXIT_AUCTION':
			action.inAuction = false;
			action.inTurn = commonService.getNextInTurn(state);
			action.winnerAuction = auctionService.getWinnerAuction(state);
		break;
	}

next(action);
};


export default matchMiddleware;