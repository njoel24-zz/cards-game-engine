import { cards } from "../constants/cards";

const matchReducer = (state = [], action) => {

switch (action.type) {

	case 'INIT_MATCH':
		return {
			players: [
				{id:1, name: 'Pippo',  cards: [] , points: 0, profile: "aggressive",  auction: {points: 0, isIn: true }},
				{id:2, name: 'Ugo',  cards: [], points: 0, profile: "aggressive", auction: {points: 0, isIn: true }},
				{id:3, name: 'Mario',  cards: [], points: 0, profile: "safe", auction: {points: 0, isIn: true }},
				{id:4, name: 'John', cards: [], points: 0, profile: "safe", auction: {points: 0, isIn: true }},
				{id:5, name: 'Tu', cards: [], points: 0, auction: {points: 0, isIn: true }}
			],
			match: { winner: undefined, winnerTurn: undefined, isTurnFinished: false, turns: 1, cardsPlayed: action.cardsPlayed },
			auction: { winner: undefined, seed: undefined, partner:  undefined, partnerPlayer: undefined },
			isFinished: false,
			inTurn: action.matchStarter,
			matchStarter: action.matchStarter,
			me: 5,
			area: 'auction',
			isStart: false,
			cards: cards
		};

	case 'START_MATCH':
		const shuffleCards = action.shuffleCards;
		return {
			...state,
			players: [{...state.players[0],cards: shuffleCards.slice(0,8)},
			{...state.players[1],  cards: shuffleCards.slice(8,16)},
			{...state.players[2],  cards: shuffleCards.slice(16,24)},
			{...state.players[3],  cards: shuffleCards.slice(24,32)},
			{...state.players[4],  cards: shuffleCards.slice(32,40)}],
			isStart: true
		};

	case 'END_TURN':
		newPlayers = [...state.players]
		newPlayers[action.winnerTurn.winner - 1].points += action.winnerTurn.totalPoints;
		return {
			...state,
			match: { ...state.match,
				winnerTurn: action.winnerTurn.winner,
				cardsPlayed: action.cardsPlayed,
				turns: action.turns, isTurnFinished: false },
				players: newPlayers,
				isFinished: action.finishedMatch,
				inTurn: action.inTurn
		};

	case 'PLAY':
		newPlayers = [...state.players]
		newPlayers[state.inTurn - 1].cards = newPlayers[state.inTurn - 1].cards.map((card) => {
			if(card!==action.cardPlayed) {
				return card;
			}
		});

		let  newCardsPlayed = [...state.match.cardsPlayed]
		newCardsPlayed[state.inTurn - 1].value = action.cardPlayed;

		return {
			...state,
			players: newPlayers,
			inTurn: action.inTurn,
			match: { ...state.match, cardsPlayed: newCardsPlayed, isTurnFinished: action.turnFinished }           
		};

	case 'CHANGE_TURN':
		return {
			...state,
			inTurn: action.inTurn,
			match: {...state.match, isTurnFinished: action.turnFinished }
		};

	case 'SET_WINNER':
		return {
			...state,
			match: { ...state.match,  winner: action.winner },
			isStart: false
		};

	case 'PLAY_AUCTION':
		newPlayers = [...state.players]
			newPlayers[state.inTurn - 1].auction = action.auctionForUser
		return {
			...state,
			inTurn: action.inTurn,
			players: newPlayers,
			auction: { ...state.auction, winner: action.winnerAuction }
		};

	case 'CHOOSE_PARTNER':
		return {
			...state,
			inTurn: action.inTurn,
			area: action.area,
			allied: action.allied,
			auction: { ...state.auction, partner: action.partner, seed: action.seed, partnerPlayer: action.partnerPlayer }
	};

	case 'PLAY_AUCTION':
	case 'RAISE_AUCTION':
		newPlayers = [...state.players]
			newPlayers[state.inTurn - 1].auction = action.auctionForUser;
		return {
			...state,
			inTurn: action.inTurn,
			players: newPlayers,
			auction: { ...state.auction, winner: action.winnerAuction }
		}

	case 'EXIT_AUCTION':
		let newPlayers = [...state.players];
		newPlayers[state.inTurn - 1].auction.isIn = action.inAuction;
		return {
			...state,
			players: newPlayers,
			inTurn: action.inTurn,
			auction: { ...state.auction, winner: action.winnerAuction }
		};

	case 'CHANGE_TURN_AUCTION':
		return {
			...state,
			inTurn: action.inTurn,
			auction: { ...state.auction, winner: action.winnerAuction }
		};

	default:
		return state;
	}
};


export default matchReducer;
