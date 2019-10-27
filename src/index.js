// react
import React from 'react'
import { render } from 'react-dom'

// actions
import { initMatch } from './actions/match'

// redux
import { createStore } from 'redux'

// redux/react
import { Provider, connect } from 'react-redux'

// app
import App from './components/App'

// import 'stylesheets/base'

// reducers
import { applyMiddleware } from 'redux'
import matchReducer from './reducers/match'

// middlewares
import matchMiddleware from './middlewares/MatchMiddleware'
const middlewares = applyMiddleware(matchMiddleware)

const store = createStore(matchReducer, middlewares)

store.dispatch(initMatch())

render(
	<Provider store={store}>
  		<App />
  	</Provider>,
  document.getElementById('root')
)