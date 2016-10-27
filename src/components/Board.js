import React from 'react'
import Players from './Players'
import Common from './Common'
import StartMatch from '../containers/StartMatch'
// {", "} a che serve?

const Board = () => (
  <p>
    <StartMatch />
    <Players />
    <Common />
  </p>
)

// Board.propTypes = {
 // active: PropTypes.bool.isRequired,
  //children: PropTypes.node.isRequired,
  //onClick: PropTypes.func.isRequired
//}

export default Board

