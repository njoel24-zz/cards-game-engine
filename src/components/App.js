import React from 'react'
import Board from './Board'

class App extends React.Component {

	render() {
		return <Board/>
	}

}

App.contextTypes = {
  store: React.PropTypes.object
}

export default App
