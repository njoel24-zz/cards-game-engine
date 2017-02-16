import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import App from './components/App'
import reducer from './reducers'
import { initMatch } from './actions'
import { Provider } from 'react-redux'
// import 'stylesheets/base'
const store = createStore(reducer)
console.log("start");
let unsubscribe  = store.subscribe(refreshUI)

function refreshUI() {
	console.log("refresh")

render(
	<Provider store={store}>
  		<App />
  	</Provider>,
  document.getElementById('root')
)

}

refreshUI();

