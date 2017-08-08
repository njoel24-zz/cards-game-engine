import _ from 'lodash'
import { AuctionService } from "./auction.service";
import { CommonService } from "./common.service";

export class MatchService {

	constructor(store) {
		this.state = store.getState();
		this.auctionService = new AuctionService(store);
		this.commonService = new CommonService(store);
	}
	
	setWinnerMatch() {
      let team1=0,team2=0;
      for(let i=0; i<this.state.players.length; i++ ) {
          let player = this.state.players[i];
          if(player.id === this.state.auction.winner || player.id === this.state.auction.partnerPlayer) {
            team1 += player.points;
          } else {
            team2 += player.points;
          }
      }
      if(team1 > team2) {
        return "caller"
      } else {
        return "others"
      }
    }

    isMatchFinished(){
      
      return (this.state.match.turns === 8)
    }


    isTurnFinished(){
      const res = this.state.match.cardsPlayed.filter( c => { return c.value == 0 } );
      return res.length == 1
    }


    getWinnerTurn(){
      let maxValue = 0;
      let winner = 0;
      let totalPoints = 0;
      let startFrom = 0;
      if(this.state.match.winnerTurn) {
        startFrom = this.state.match.winnerTurn
      } else {
        startFrom = this.state.matchStarter;
      }

      for( let i = startFrom; i< 5+startFrom; i++ ) {
          let indexPlayer = i%5;
          let c = this.state.match.cardsPlayed[indexPlayer];
          let valueCurrentcard =  0
          if(c.value) {
            if(this.state.auction.seed === this.state.cards[c.value].seed ) {
              valueCurrentcard = this.state.cards[c.value].value + 1000
            } else if(i===startFrom) {
              valueCurrentcard = this.state.cards[c.value].value + 100
            } else if(this.state.cards[c.value].seed === this.state.cards[this.state.match.cardsPlayed[startFrom].value].seed) {
              valueCurrentcard = this.state.cards[c.value].value + 100
            } else {
              valueCurrentcard = this.state.cards[c.value].value
            }

            if(valueCurrentcard > maxValue) {            
              maxValue = valueCurrentcard
              winner = c.id
            } 
            totalPoints += this.state.cards[c.value].points
          }
      }
      return { winner: winner, totalPoints: totalPoints }
    }

    playCardOnTheTable(cardToPlay = null){
      let c = null;
      if (!cardToPlay) {
        return this.getCardToPlay()
      } else {
        return cardToPlay
      }
    }

    amITheFirstOne() {
      const cardsPlayed = this.state.match.cardsPlayed;
      return cardsPlayed.filter( c => { return c.value !== 0 } ).length == 0
    }

    amITheLastOne() {
      const cardsPlayed = this.state.match.cardsPlayed;
      return cardsPlayed.filter( c => { return c.value !== 0 } ).length == 4
    }

    getCurrentContext(p){
      const winnerTmpTurn = this.getWinnerTurn().winner;
      return {
        maxValuePlayed: this.getMaxValueFromCardsPlayed(),
        tmpSumPoints: this.getTmpMaxPointsTurn(),
        auctionValue:  this.state.players[this.state.auction.winner].auction.points,
        puntiConsumedByTeam: this.getPuntiConsumedByTeam(),
        tmpWinnerTeamTurn: winnerTmpTurn,
        lastOneToPlay: this.whichIsTheLastOneToPlay(),
        isOther: this.isOther(p),
        isCaller: this.isCaller(p),
        isPartner: this.isPartner(p),
        currentTurn: this.state.turns,
        amITheLastOne: this.amITheLastOne(),
        amItheFirstOne: this.amITheFirstOne(),
        amIAlreadyWonTheMatch: this.amIAlreadyWonTheMatch(p),
        myAllCardsByValue: _.sortBy(this.commonService.getMyAllCards(p.cards), ['value']),
        myAllCardsByPoints: _.sortBy(this.commonService.getMyAllCards(p.cards), ['points']),
        myTeamIsWinningTurn: (this.isOther(p) && 
        ( winnerTmpTurn !== this.state.auction.winner && winnerTmpTurn !== this.state.auction.partnerPlayer  ) )
          || ( (this.isPartner(p) || this.isCaller(p)) && ( winnerTmpTurn === this.state.auction.winner || winnerTmpTurn === this.state.auction.partnerPlayer  ) )
      }
    }

    addPoints(context) {
      const myAllCardsByPoints = context.myAllCardsByPoints
      for(let i=0; i<myAllCardsByPoints.length-1; i++) {
        if(myAllCardsByPoints[myAllCardsByPoints.length-1].seed !== this.state.auction.seed){
          return myAllCardsByPoints[myAllCardsByPoints.length-1].id
        }
      }
      return myAllCardsByPoints[myAllCardsByPoints.length-1].id;
    }

    getStrategy(context) {
      // edge cases 
      if(context.amIAlreadyWonTheMatch){
        return this.playSafe(context);
      }

      if(context.amItheFirstOne){
        if(context.isOther) {
          return this.addPoints(context);
        } else {
          return this.playSafe(context);
        }
      } else if (context.amITheLastOne) {
        if (context.myTeamIsWinningTurn) {
           return this.addPoints(context);
        } else {
         const tryToWinCard = this.tryToWin(context)
          if (!tryToWinCard) {
            return this.playSafe(context)
          } else {
            return tryToWinCard
          } 
        }
      } 
      
      if (context.myTeamIsWinningTurn) {
        return this.addPoints(context)
      } else {
        const tryToWinCard = this.tryToWin(context)
        if (!tryToWinCard) {
          return this.playSafe(context)
        } else {
          return tryToWinCard
        }
      }
    }

    getInTurnPlayer() {
      return this.state.players.filter( p => { return p.id == this.state.inTurn } )[0]
    }
    
    getCardToPlay() {
      const p = this.getInTurnPlayer();
      if(p) {
        const context = this.getCurrentContext(p);
          if (context.isCaller) {
            return this.getStrategy(context)
          } else if(context.isPartner) {
            return this.getStrategy(context)
          } else {
            return this.getStrategy(context)
          }
      }
      return 1
    }


  tryToWin(context) {
    const myAllCardsByValue = context.myAllCardsByValue
    for(let i =0; i<myAllCardsByValue.length; i++) {
      let tmpVal = myAllCardsByValue[i].value
      const firstPlayedSeed = this.getFirstPlayedSeed()
      if(firstPlayedSeed && (myAllCardsByValue[i].seed == firstPlayedSeed)  && (myAllCardsByValue[i].seed != this.state.auction.seed)) {
        tmpVal += 100
      } else if(myAllCardsByValue[i].seed == this.state.auction.seed){
        tmpVal += 1000
      }
      if(tmpVal > context.maxValuePlayed) {  
        return myAllCardsByValue[i].id
      }
    }
  }


  getFirstPlayedSeed() {
    for(let i=0; i<this.state.match.cardsPlayed.length; i++) {
      const currentIndexCard = this.state.match.cardsPlayed[i].value;
      const player = this.state.match.cardsPlayed[i].id;
      if(currentIndexCard > 0 ) {
        if(this.state.match.winnerTurn && this.state.match.winnerTurn === player ) {
          return currentIndexCard
        } else if (this.state.auction.winner && this.state.auction.winner === player ) {
          return currentIndexCard
        }
      }
    }
  }

  playSafe(context){
    let minValue = 1000;
    let tmpCard = 0
    const myAllCardsByValue = context.myAllCardsByValue;
    for(let i =0; i<myAllCardsByValue.length; i++) {
      if(myAllCardsByValue[i].value < minValue && (myAllCardsByValue[i].seed !== this.state.auction.seed )){
        minValue = myAllCardsByValue[i].value
        tmpCard = myAllCardsByValue[i].id
      }
    }
    if(tmpCard == 0) {
      tmpCard = myAllCardsByValue[0].id
    }
    return tmpCard
  }

  whichIsTheLastOneToPlay(){
    if(this.state.turns == 1){
        return 5
    } else {
        return this.state.players[this.state.match.winnerTurn-1];
    }
  }

  getTmpWinnerMatch(puntiByTeam) {
    if(puntiByTeam.allied > puntiByTeam.others){
        return "allied"
    }else{
        return "others"
    }
  }

  getPuntiConsumedByTeam() {
    let sumPoints = {allied: 0, others: 0}
    this.state.players.map(p => {
        if(p.id === this.state.auction.winner ||  p.id == this.state.auction.partnerPlayer){
          sumPoints.allied += p.points
        } else {
          sumPoints.others += p.points
        }
      })
    return sumPoints
  }

  isOther(p) {
    return !(this.state.auction.winner === p.id) && !(this.state.auction.partnerPlayer === p.id)
  }

  isPartner(p) {
   return this.state.auction.partnerPlayer === p.id
  } 

  isCaller(p){
    return this.state.auction.winner === p.id 
  }
  
  getProportionValueByPoints (p, context) {
    const pointsOnTable = context.tmpSumPoints;
    const myOrderedValues = context.myAllCardsByValue;
    const breakpoints = myOrderedValues.length/3
    
    if (pointsOnTable < 10) {
        return myOrderedValues[0]
    } else if (pointsOnTable < 20) {
        return myOrderedValues[myOrderedValues.length-1]
    } else {
       return myOrderedValues[myOrderedValues.length-1]
    }  
  }

  amIAlreadyWonTheMatch(p) {
    const auction = this.auctionService.getBiggestAuction(this.state.players);
    const puntiByTeam = this.getPuntiConsumedByTeam();
    if (this.isCaller(p) || this.isPartner(p) ) {
        return puntiByTeam.alleati > auction
    } else {
        return puntiByTeam.others > auction
    }
  }
    
  getTmpMaxPointsTurn() {
    let sumPoints = 0
    this.state.match.cardsPlayed.map(card => {
      if(card.value > 0 ) {
        sumPoints += this.state.cards[card.value].points
      }
    })
    return sumPoints
  }

  getMaxValueFromCardsPlayed() {
      let maxValue = 0
      let startFrom = 0;
      if(this.state.match.winnerTurn) {
        startFrom = this.state.match.winnerTurn
      } else {
        startFrom = this.state.matchStarter
      }

      for( let i = startFrom; i< 5+startFrom; i++ ) {
          let indexPlayer = i%5
          let c = this.state.match.cardsPlayed[indexPlayer]

          let valueCurrentcard =  0
          if(c.value) {
            if(this.state.auction.seed === this.state.cards[c.value].seed ) {
              valueCurrentcard = this.state.cards[c.value].value + 1000
            } else if(i===startFrom) {
              valueCurrentcard = this.state.cards[c.value].value + 100
            } else if(this.state.cards[c.value].seed === this.state.cards[this.state.match.cardsPlayed[startFrom].value].seed) {
              valueCurrentcard = this.state.cards[c.value].value + 100
            } else {
              valueCurrentcard = this.state.cards[c.value].value
            }
            if(valueCurrentcard > maxValue) {            
              maxValue = valueCurrentcard
            } 
          }
      }
      return maxValue
    }
}

export default MatchService

