import React from 'react'
import Board from './Board'

class App extends React.Component {
	render() {
		return <Board store={this.props.store} />
	}
}
  

export default App
