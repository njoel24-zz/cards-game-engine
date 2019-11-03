import React from 'react';
import { render } from 'react-dom';
import { initMatch } from './actions/match';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import { applyMiddleware } from 'redux';
import matchReducer from './reducers/match';

// middlewares
import matchMiddleware from './middlewares/MatchMiddleware';
const middlewares = applyMiddleware(matchMiddleware);

const store = createStore(matchReducer, middlewares);

store.dispatch(initMatch());

render(
	<Provider store={store}>
		<App />
	</Provider>,
document.getElementById('root')
)