import React from 'react'
import Players from './Players'
import Common from './Common'
import StartMatch from './StartMatch'

class Board extends React.Component {
	
  render() {
    
    return (
    <div className='container'>
    	<StartMatch/>
      <Common />
    	<Players/>
    	<me/>
    </div>
    )
  }
}

export default Board