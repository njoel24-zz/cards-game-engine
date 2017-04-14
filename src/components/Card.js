import React, { Component } from 'react';

export class Card extends React.Component {

render () {
	return (
        <img className={(this.props.card === 0) ? 'hidden': 'card'}  src={'img/'+this.props.card+'.jpg'} />
		)
	}
}  

export default Card;

