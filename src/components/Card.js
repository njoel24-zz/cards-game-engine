import React from 'react'

export class Card extends React.Component {

render () {
	return (
        <img src={this.props.src} className='card'/>
		)
	}
}  

export default Card;

