import React from 'react'
import { connect } from 'react-redux'
import { startMatch } from '../actions/match';

class StartMatch extends React.Component {
	render () {	
		return (
			<li className='col-xs-2'> 
				<button onClick={ this.props.startMatch}>Inizia Partita</button>
			</li>
		)
	}
}  

const mapStateToProps = function(store) {
return {};
}

const mapDispatchToProps = function(dispatch) {
	return {
		startMatch: () => {
		dispatch(startMatch());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StartMatch);
