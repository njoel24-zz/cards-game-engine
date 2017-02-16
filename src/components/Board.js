import React from 'react'
import Players from './Players'
import Common from './Common'
import StartMatch from './StartMatch' 

class Board extends React.Component {
	
  render() {
    console.log("Board called")
    return (
    <div className='container'>
      <Common />
    	<Players/>
    	<me/>
      <StartMatch/>
    </div>
    )
  }
}

export default Board