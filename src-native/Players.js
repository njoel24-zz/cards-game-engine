import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './Card'
class Players extends React.Component {

render () {
	return (
		<View style={{flex: 1, flexDirection: 'row'}}>
			{this.props.players.map(player =>
				<View style={{flex: 1}} key={player.id}>
					<View style={{flex: 1, minHeight: 100}}>
						<Text>{player.name}</Text>
						<Text> {player.points} Points</Text>
						{ player.auction.isIn ? ( <Text> Points Auction: {player.auction.points}</Text> ) : null }
						{ player.auction.isIn ? ( <Text>In Auction</Text> ) : null }
						{ player.id == this.props.match.winner ? ( <Text>Winner!</Text> ) : null }
						{ player.id == this.props.auction.winner ? ( <Text>Winner Auction/Vincitore Asta!</Text>) : null }
						{ player.id == this.props.auction.partner ? ( <Text>Partner!</Text>) : null }
						{ player.id == this.props.match.winnerTurn ? ( <Text>Winner Turn!</Text>) : null }
						{ player.id == this.props.inTurn ? ( <Text style={{backgroundColor: "green", height: 20, width:"100%"}}></Text> ) : null }
					</View>
					<View style={{flex: 1}}>
						{ this.props.match.cardsPlayed.map(card => getPlayedCard(card,player)) }
					</View>
				</View>
			)}
		</View>
		)
	}
}

const getPlayedCard = function(card, player) {
	if(player.id === card.id ){
		return <Card card={card.value}  key={card.id}  />
	}
};							
  

const mapStateToProps = function(store) {
  return {
    players: store.players,
		inTurn: store.inTurn,
		match: store.match,
		auction: store.auction
  };
}

export default connect(mapStateToProps)(Players);
