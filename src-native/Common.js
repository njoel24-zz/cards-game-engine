import React from 'react'
import { connect } from 'react-redux'


import { startMatch } from '../src/actions/match'
import { Card } from './Card'
import { View, Text, StyleSheet, Button } from 'react-native';

class Common extends React.Component {

render () {
	return (
		 <View>
			 { !this.props.isStart ? ( <Button  title="Start Match" onPress={this.props.startMatch}></Button> ) : null }
		 </View>
		)
	}
} 
const mapStateToProps = function(store) {
  return {
    match: store.match,
    auction: store.auction,
		isStart: store.isStart
  };
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    startMatch: () => {
      dispatch(startMatch());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Common);

