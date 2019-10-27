import React from 'react';
import { connect } from 'react-redux';
import { choosePartner } from '../actions/auction';

class ChoosePartner extends React.Component {

	createSelectItems() {
		let items = [];
		for (const key in this.props.allCards) {
			if(this.props.allCards.hasOwnProperty(key)){
				items.push(<option key={key} value={key}>{this.props.allCards[key].name + " " + this.props.allCards[key].seed}</option>);
			}
		}
		return items;
	}

	render () {
		if(this.props.show) {
			return (
				<div>
					<select id="partner">
						{this.createSelectItems()}
					</select>
					<button onClick={ this.props.choosePartner}>Ok</button>
				</div>
			)
		} else {
			return null;
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
		choosePartner: () => {
				let value= 0
				if(document.getElementById("partner")){
					value = document.getElementById("partner").value
				}
		dispatch(choosePartner(value));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePartner);
