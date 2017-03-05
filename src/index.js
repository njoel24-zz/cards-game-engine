// react
import React from 'react'
import { render } from 'react-dom'

// redux
import { createStore } from 'redux'

// redux/react
import { Provider } from 'react-redux'

// app
import App from './components/App'
// import reducer from './reducers'
import { initMatch } from './actions'

// import 'stylesheets/base'

// reducers
import { applyMiddleware } from 'redux'
import matchReducer from './reducers/match'


// middlewares
import matchMiddleware from './middlewares/MatchMiddleware'
const middlewares = applyMiddleware(matchMiddleware)

const store = createStore(matchReducer, middlewares)

// let unsubscribe  = store.subscribe(refreshUI)

// function refreshUI() {
console.log("refresh")
render(
	<Provider store={store}>
  		<App />
  	</Provider>,
  document.getElementById('root')
)

// }

// refreshUI();

