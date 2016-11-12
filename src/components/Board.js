import React from 'react'
import Players from './Players'
import Common from './Common'
import StartMatch from './StartMatch'

class Board extends React.Component {
	
  render() {
    
    return (
    <div>
    	<StartMatch/>
    	<Players/>
    	<Common />
    </div>
    )
  }
}

export default Board