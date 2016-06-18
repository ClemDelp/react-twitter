//
// MODULE
//

import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchTrends } from '../actions/api'

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
        const woeid = e.target.options[e.target.selectedIndex].value
        const promise = new Promise(function (resolve, reject) {})
        promise.then(dispatch({
          type: 'SET_CURRENT_PLACE_WOEID',
          woeid: woeid
        })).then(
          fetchTrends()
        )
	    }}>
    		{placesAvailable.map((place, index) => {
	      	return (
	      		<option key={index} value={place.woeid}>{place.name}</option>
	      	)
    		})}
      </select>
    </div>
  )
}

// CONNECT & EXPORT
const mapStateToProps = ({appReducer: {placesAvailable}}) => {
  let list = _.sortBy(placesAvailable, 'name').map(obj => {
    return obj
  })
  return {placesAvailable: list}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { dispatch, fetchTrends}
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceSelection) 