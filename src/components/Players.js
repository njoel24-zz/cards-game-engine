import React from 'react'
// {", "} a che serve?

const Players = ({ state }) => (
  <div>
  {state.players.map(player =>
      <div>{player.name}<div/>
    )}
  </div>
)

export default Players
