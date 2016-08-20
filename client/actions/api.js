// polyfills fetch on window object, if necessary
require('whatwg-fetch')
import { getStore } from '../main.jsx'

export function fetchPlacesAvailable () {
	const store = getStore()
	return fetch('/trends/available')
	.then(function (response) {
		return response.json()
	}).then(function (json) {
		const placesAvailable = JSON.parse(json.data)
		// SET GRAPH
		store.dispatch({
		  type: 'SET_PLACES_AVAILABLE',
		  placesAvailable: placesAvailable
		})
		return placesAvailable
	}).catch(function (ex) {
		console.log('get places available failed', ex)
	})
}

export function fetchTrends () {
	const store = getStore()
	const woeid = store.getState().appReducer.currentPlaceWoeid
	return fetch('/trends', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			woeid: woeid
		})
	})
	.then(function (response) {
		return response.json()
	}).then(function (json) {
		const trends = JSON.parse(json.data)
		// SET TRENDS
		store.dispatch({
		  type: 'SET_TRENDS',
		  trends: trends[0]
		})
		return trends
	}).catch(function (ex) {
		console.log('get trends failed', ex)
	})
}

export function getTweetStream () {
	const store = getStore()
	const trend = store.getState().appReducer.currentTrend
	return fetch('/tweets', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			hastag: trend
		})
	})
}
