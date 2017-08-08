import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, StyleSheet, Dimensions ,Animated,
	Easing, TouchableHighlight } from 'react-native';
	import { play } from '../src/actions/match'

class Me extends React.Component {

render () {
	const width = Dimensions.get('window').width; 
	return (
		<View style ={{ flex: 1, flexDirection: 'row', minHeight: 150 }}>
	  		{this.props.players[this.props.me].cards.map(c =>
					<View style={{flex: 1, minHeight: 100}} key={c}>
					{ this.props.me==this.props.inTurn && this.props.area == "match" ?
				 		( <TouchableHighlight  onPress={(d) => this.props.play(c)}>
								<Animated.Image style = { styles.image }  source={{uri: 'http://briscolain5.com/img/'+c+'.jpg'}} />
					  	</TouchableHighlight>) : 
						(<Image style = { styles.image } source={{ uri: 'http://briscolain5.com/img/'+c+'.jpg' }}/>)
					}
				</View>
    		)}	
		</View>
		)
	}
}  

const animatedWidth = function(card) {	
		const state = {
      opacity: new Animated.Value(1),          
    };
		Animated.timing(                            
      state.opacity,                      
      {
        toValue: 0,                            
      }
		).start();
		
	}

const styles = StyleSheet.create({
	image: {
		maxWidth: 170,
    width: "100%",
		minHeight: 251
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

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
	play: (c) => {
      dispatch(play(c));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Me);















