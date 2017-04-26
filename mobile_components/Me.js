import React from 'react'
import { connect } from 'react-redux'

import { Card } from './Card'
import { Points } from './Points'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
class Me extends React.Component {

render () {
	const width = Dimensions.get('window').width; 
	return (
		<View style={{flex: 1, flexDirection: 'row'}}>
			<View style={{flex: 1, flexDirection: 'row'}}>
				<Points show={(this.props.me==this.props.inTurn) && this.props.area == "auction" }  />
			</View>
			<View style={{flex: 1, flexDirection: 'row'}}>
				<View style={{flex: 0.9, flexDirection: 'row'}} >
	  			{this.props.players[this.props.me].cards.map(c =>
					<Card card={c}  key={c} animate={(this.props.me==this.props.inTurn) && this.props.area == "match" }  />
    			)}
				
				</View>
				<View style={{flex: 0.1, flexDirection: 'row'}}>
					{ this.props.inTurn == this.props.me ? ( <Text>Tocca a te!</Text>) : null }
				</View>
			</View>
		</View>
		)
	}
}  

const styles = StyleSheet.create({
	container: {
    	width: 170,
		height: 251
  	}
});

const mapStateToProps = function(store) {
  return {
    players: store.players,
	me: store.me,
	inTurn: store.inTurn,
	isStart: store.isStart,
	area: store.area
  };
}

export default connect(mapStateToProps)(Me);
