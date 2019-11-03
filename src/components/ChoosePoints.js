import React from 'react';
import { connect } from 'react-redux';
import { playAuction, exitAuction } from '../actions/auction';

class ChoosePoints extends React.Component {
	constructor() {
		super();
	}
	updateValue() {
		if(document.getElementById("range")) {
			document.getElementById("value").innerHTML = document.getElementById("range").value;
		}
	}
	render () {	
		if(this.props.show) {
			return (
				<div>
					<input id="range" type="range" min={70} max={120} defaultValue={70} step={1} onChange={this.updateValue.bind(this)}  />
					<span id="value"></span>
					<button onClick={ this.props.playAuction}>Ok</button>
					<button onClick={ this.props.exitAuction}>Esci</button>
				</div>
			)
		} else {
			return null;
		}
	}
}

const mapStateToProps = function() {
	return {};
}

const mapDispatchToProps = function(dispatch) {

	return {
		playAuction: () => {
			let value= 0
			if(document.getElementById("range")){
				value = document.getElementById("range").value
			}
			dispatch(playAuction(value));
		},
		exitAuction: () => {
			dispatch(exitAuction());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePoints);
