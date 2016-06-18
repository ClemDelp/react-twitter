//
// IMPORTS
//

import { combineReducers } from 'redux'

//
// INITIAL STATE
//

const intialState = {
  placesAvailable: [],
  currentPlaceWoeid: 1, // worldwide
  trends: {}
}

//
// REDUCER
//

function appReducer (state = intialState, action) {
  switch (action.type) {

    case "SET_PLACES_AVAILABLE":
      return Object.assign({}, state, {
        placesAvailable : action.placesAvailable
      })

    case "SET_CURRENT_PLACE_WOEID":
      return Object.assign({}, state, {
        currentPlaceWoeid: action.woeid
      })

    case "SET_TRENDS":
      return Object.assign({}, state, {
        trends: action.trends
      })

    default:
      return state
  }
}

const rootReducer = combineReducers({
  appReducer
})

//
// EXPORT
//

export default rootReducer

