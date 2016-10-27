import React from 'react'
import { connect } from 'react-redux'
import { startMatch } from '../actions'

let StartMatch = ({ dispatch }) => {
  let input

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
