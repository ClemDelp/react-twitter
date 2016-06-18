//
// MODULE
//

import React from 'react'
import { connect } from 'react-redux'

//
// COMPONENT
//

const PlaceSelection = ({
  placesAvailable,
  dispatch
}) => {
  return (
    <div>
      	<select onChange={(e) => {
	        e.preventDefault()
	        let val = e.target.options[e.target.selectedIndex].value
	        const promise = new Promise(function (resolve, reject) {})
	        promise.then(dispatch({
	          type: 'SET_CURRENT_PLACE',
	          placeId: val
	        })).then(
	          fetchTrends()
	        )
	    }}>
      		{placesAvailable.map((place) => {
		      	return (
		      		<option value={place.id}>{place.id}</option>
		      	)
      		})}
        </select>
    </div>
  )
}

// CONNECT & EXPORT
const mapStateToProps = ({
  appReducer: {
    placesAvailable
  }
}) => {
  return {
    placesAvailable
  }
}

export default connect(
  mapStateToProps
)(PlaceSelection) 