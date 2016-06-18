// IMPORT
import React from 'react'
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Meteor } from 'meteor/meteor';
import rootReducer from './reducers'
import Root from './containers/Root'
import {fetchPlacesAvailable, fetchTrends} from './actions/api'
import ReactDOM from 'react-dom'

// CREATE REDUX SOTRE
const store = createStore(
  rootReducer, {}, window.devToolsExtension ? window.devToolsExtension() : undefined
)
export function getStore () { return store }
// FETCH INIT DATA
fetchPlacesAvailable()
// fetchTrends()

// APP
Meteor.startup(() => {
  
	const reactDivElement = document.getElementById('render-target')
	if (reactDivElement) {
		ReactDOM.render(<Root store={store} />, reactDivElement)
	}

});

