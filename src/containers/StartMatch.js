import React from 'react'
import { startMatch } from '../actions'

let StartMatch = ({ dispatch }) => {
  
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        dispatch(startMatch())
      }}>
        <button type="submit">
          Start Match
        </button>
      </form>
    </div>
  )
}

export default StartMatch
