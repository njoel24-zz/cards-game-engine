import React from 'react'
import { connect } from 'react-redux'
import { startMatch, setWinner,  endTurn,
		changeTurn, play, playBot} from '../actions/match'
import { playAuctionBot, 
	 playAuction,
	 endAuction, 
	 exitAuction,
	 changeTurnAuction, chooseCompagno } from '../actions/auction'

class ChooseCompagno extends React.Component {

    createSelectItems() {
     let items = [];         
     for (var key in this.props.allCards) {
        if(this.props.allCards.hasOwnProperty(key)){
          items.push(<option key={key} value={key}>{this.props.allCards[key].nome + " " + this.props.allCards[key].seme}</option>);   
        }
     }
     return items;
    }  

	render () {	
		if(this.props.show) {	
		return (
			<div>
                <select id="compagno">
                    {this.createSelectItems()}
                </select>
				<button onClick={ this.props.chooseCompagno}>Ok</button>
			</div>
		)
		} else {
			return null
		}
	}
}  

const mapStateToProps = function(store) {
  return {
      allCards: store.cards
  };
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    chooseCompagno: () => {
			let value= 0
			if(document.getElementById("compagno")){
				value = document.getElementById("compagno").value
			}
      dispatch(chooseCompagno(value));
    }	
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCompagno);
