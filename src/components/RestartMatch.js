import React from 'react'
import { connect } from 'react-redux'
import { initMatch, startMatch } from '../actions/match';

class RestartMatch extends React.Component {
	render () {
		return (
			<div className='start-match'> 
				<button onClick={this.start.bind(this)}>Restart Partita</button>
			</div>
		)
	}

	start(){
		this.props.restartMatch((this.props.matchStarter % 5)+1);
	}
}

const mapStateToProps = function(store) {
	return {
		matchStarter: store.matchStarter
	};
}

const mapDispatchToProps = function(dispatch) {
	return {
		restartMatch: (matchStarter) => {
			dispatch(initMatch(matchStarter));
			dispatch(startMatch());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RestartMatch);
