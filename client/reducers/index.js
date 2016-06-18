//
// IMPORTS
//

import { combineReducers } from 'redux'

//
// INITIAL STATE
//

const intialState = {
  placesAvailable: [],
  currentPlaceId: {}
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

    case "SET_CURRENT_PLACE":
      return Object.assign({}, state, {
        currentPlaceId: action.placeId
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

