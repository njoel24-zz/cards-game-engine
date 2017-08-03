import React, { Component } from 'react';
import { View, Text, Image, StyleSheet,  Animated,
  Easing, TouchableHighlight } from 'react-native';

import { connect } from 'react-redux'

import { play } from '../src/actions/match'

export class Card extends React.Component {

	constructor () {
  	super()
  	this.state = {
      opacity: new Animated.Value(1),          // Initial value for opacity: 0
    };
	}


	animatedWidth () {	
		Animated.timing(                            // Animate over time
      this.state.opacity,                      // The animated value to drive
      {
        toValue: 0,                             // Animate to opacity: 1, or fully 
      }
    ).start();
	}

	playCard(card) {
		// animation
		this.animatedWidth();
		// this.props.play(card);
	}

	render () {
	
		if(this.props.card != 0) {
			return (
				<View style= {{ flex: 1,  flexDirection: 'row' }}>
					{ this.props.animate ?
				 		( <TouchableHighlight style= {{ flex: 1 }} onPress={this.animatedWidth.bind(this)}>
								<Animated.Image style = {{ opacity: this.state.opacity, flex: 1,maxWidth: 170, width: "100%", minHeight: 251 }} source={{uri: 'http://briscolain5.com/img/'+this.props.card+'.jpg'}} />
					  	</TouchableHighlight>) : 
						(<Image style = { styles.image } source={{ uri: 'http://briscolain5.com/img/'+this.props.card+'.jpg' }}/>)
					}
				</View>
				)
			} else {
				return null
			}
		}
}  

const styles = StyleSheet.create({
	image: {
		flex: 1,
		maxWidth: 170,
    	width: "100%",
		minHeight: 251
  	}
});

const mapStateToProps = function(store) {
  return {
    match: store.match,
    auction: store.auction,
		isStart: store.isStart
  };
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    play: (card) => {
      dispatch(play(card));
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Card);

