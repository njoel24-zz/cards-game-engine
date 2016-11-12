import React from 'react'
import Players from './Players'
import Common from './Common'
import StartMatch from './StartMatch'

class Board extends React.Component {
	
  render() {
    let store = this.props.store;
    let state = store.getState();
    return (
    <div>
    	<StartMatch dispatch={store.dispatch} />
    	<Players  players={state.players} />
    	<Common cards={state.cardsPlayed} />
    </div>
    )
  }
}

export default Board