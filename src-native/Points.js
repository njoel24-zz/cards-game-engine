import React, { Component } from 'react';
import { View, Text, Image, StyleSheet,  Animated,
  Easing, TouchableHighlight, Slider } from 'react-native';

import { connect } from 'react-redux'

import { play } from '../src/actions/match'

export class Points extends React.Component {

	constructor () {
  		super()
  		  this.state = {
      		value: 70,     
    	};
	}

	render () {	
		if(this.props.show) {
			return (
				<View style= {{ flex: 1,  flexDirection: 'row' }}>
					<Text style= {{flex: 1}} >
          	{this.state.value && +this.state.value.toFixed(3)}
        	</Text>
      		<Slider style= {{flex: 1}} minimumValue={70} maximumValue={120} step={1} onValueChange={(value) => this.setState({value: value})}></Slider>
				</View>
				)
			} else {
				return null
			}
		}
}  

const styles = StyleSheet.create({
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
    playCard: (card) => {
      dispatch(playCard(card));
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Points);

