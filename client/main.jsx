import React from 'react'
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Meteor } from 'meteor/meteor';
import rootReducer from './reducers'
import Root from './containers/Root'

import ReactDOM from 'react-dom'

const store = createStore(rootReducer)

Meteor.startup(() => {
  
	//
	// APP
	//

	const reactDivElement = document.getElementById('render-target')
	if (reactDivElement) {
		ReactDOM.render(<Root store={store} />, reactDivElement)
	}

});

