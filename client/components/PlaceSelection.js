//
// MODULE
//

import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchTrends } from '../actions/api'
import {setCurrentPlaceWoeid} from '../reducers/index'

// MATERIAL UI
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

//
// COMPONENT
//

const PlaceSelection = ({
  placesAvailable,
  setCurrentPlaceWoeid
}) => {
  return (
    <Menu onChange={(event, woeid) => {
        const promise = new Promise(function (resolve, reject) {})
        promise.then(setCurrentPlaceWoeid(woeid))
        .then(
          fetchTrends()
        )
    }}>
      {
        placesAvailable.map((place, index) => {
          return (
            <MenuItem
              key={index}
              value={place.woeid}
              primaryText={place.name}
            />
          )
        })
      }
    </Menu>
  )
}

// CONNECT & EXPORT
const mapStateToProps = ({appReducer: {placesAvailable}}) => {
  let list = _.sortBy(placesAvailable, 'name').map(obj => {
    return obj
  })
  return {placesAvailable: list}
}

export default connect(
  mapStateToProps,
  {
    setCurrentPlaceWoeid
  }
)(PlaceSelection) 