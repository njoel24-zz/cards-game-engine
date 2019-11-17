import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Image } from 'react-native';
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
						{ player.id == this.props.auction.partnerPlayer ? ( <Text>Partner!</Text>) : null }
						{ player.id == this.props.match.winnerTurn ? ( <Text>Winner Turn!</Text>) : null }
						{ player.id == this.props.inTurn ? ( <Text style={{backgroundColor: "green", height: 20, width:"100%"}}></Text> ) : null }
					</View>
					<View style={{flex: 1, minHeight: 281}}>
						{ this.props.match.cardsPlayed.map(card => getPlayedCard(card,player)) }
					</View>
				</View>
			)}
		</View>
		)
	}
}

const styles = StyleSheet.create({
	image: {
		maxWidth: 170,
    width: "100%",
		minHeight: 251
  	}
});

const getPlayedCard = function(card, player) {
	if(player.id === card.id && card.value !==0 ){
		return <Image style = { styles.image }  key={card.id} source={{ uri: 'http://briscolain5.com/img/'+card.value+'.jpg' }}/>
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
