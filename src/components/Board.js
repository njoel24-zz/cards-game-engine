import React from 'react'
import Players from './Players'
import Common from './Common'
import StartMatch from './StartMatch' 
import Me from './Me' 

class Board extends React.Component {
	
  render() {
    return (
    <div className='container'>
      <Common />
    	<Players/>
    	<Me/>
      <StartMatch/>
    </div>
    )
  }
}

export default Board