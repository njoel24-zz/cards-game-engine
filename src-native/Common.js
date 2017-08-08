import React from 'react'
import { connect } from 'react-redux'
import { startMatch } from '../src/actions/match'
import { playAuction, exitAuction, raiseAuction } from '../src/actions/auction'
import { View,Button, Image, StyleSheet, Text } from 'react-native';

class Common extends React.Component {

render () {
	return (
		 <View>
			 <Button  title="Start New Match" onPress={this.props.startMatch}></Button>
       { (this.props.me==this.props.inTurn && this.props.area == "auction") ? ( <Button  title="Exit" onPress={this.props.exitAuction}></Button> ) : null }
       { (this.props.me==this.props.inTurn && this.props.area == "auction") ? ( <Button  title="Raise" onPress={this.props.raiseAuction}></Button> ) : null }
       { this.props.area == "match" ?
       <View>
         <Text>Partner: { this.props.seed }</Text>
         <Text>Winner: { this.props.winner }</Text>
       </View>
       : null }
		 </View>
		)
	}
} 

const styles = StyleSheet.create({
	image: {
    width: "20%"
  	}
});

const mapStateToProps = function(store) {
  return {
    me: store.me,
	  inTurn: store.inTurn,
	  isStart: store.isStart,
    area: store.area,
    seed: store.auction.seed,
    winner: store.match.winner
  };
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    startMatch: () => {
      dispatch(startMatch());
    },
    playAuction: () => {
      dispatch(playAuction());
    },
    raiseAuction: () => {
      dispatch(raiseAuction());
		},
    exitAuction: () => {
      dispatch(exitAuction());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Common);

