import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import App from './components/App'
import reducer from './reducers'
import { initMatch } from './actions'

const store = createStore(reducer)
store.dispatch(initMatch())
console.log("start");
console.log(store.getState());
render(
  <App store={store} />,
  document.getElementById('root')
)
