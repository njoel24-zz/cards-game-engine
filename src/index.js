import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import App from './components/App'
import reducer from './reducers'
import { initMatch } from './actions'
import { Provider } from 'react-redux'

const store = createStore(reducer)
store.dispatch(initMatch())
console.log("start");
console.log(store.getState());

render(
	<Provider store={store}>
  		<App />
  	</Provider>,
  document.getElementById('root')
)

