import React from 'react'
import Players from './Players'
import Common from './Common'
import StartMatch from '../containers/StartMatch'
// {", "} a che serve?

const Board = () => (
  <div>
    <StartMatch />
    <Players players={state.players} />
    <Common />
  </div>
)

// Board.propTypes = {
 // active: PropTypes.bool.isRequired,
  //children: PropTypes.node.isRequired,
  //onClick: PropTypes.func.isRequired
//}

export default Board

