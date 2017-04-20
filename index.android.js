/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { AppRegistry } from 'react-native';

// actions
import { initMatch } from './actions/match'

// redux/react
import { Provider } from 'react-redux'

// app
import App from './components/App'

// reducers
import { applyMiddleware, createStore } from 'redux'
import matchReducer from './reducers/match'

// middlewares
import matchMiddleware from './middlewares/MatchMiddleware'

const middlewares = applyMiddleware(matchMiddleware);
const store = createStore(matchReducer, middlewares);
store.dispatch(initMatch());

const Briscola = () => (
  <Provider store={store}>
    <App />
  </Provider>
)


AppRegistry.registerComponent('Briscola', () => Briscola);
