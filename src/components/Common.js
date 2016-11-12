import React from 'react'

class Common extends React.Component {

render () {
	if(!this.props.cards)
		return null;
	return (
		<ul>
    		{this.props.cards.map(card =>
  				<li key={card.id}>card.name</li>
    		)}
  		</ul>
		)
	}
}  

export default Common
