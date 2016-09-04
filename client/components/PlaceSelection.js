//
// MODULE
//
import AutoComplete from 'material-ui/AutoComplete';
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
  placesIndexedByName,
  words,
  setCurrentPlaceWoeid
}) => {
  return (
    <AutoComplete
      onNewRequest={(name) => {
        if (placesIndexedByName[name] && placesIndexedByName[name].woeid) {
          const woeid = placesIndexedByName[name].woeid
          console.log(placesIndexedByName[name])
          console.log('woeid', woeid)
          const promise = new Promise(function (resolve, reject) {})
          promise.then(setCurrentPlaceWoeid(woeid))
          .then(
            fetchTrends()
          )
        }
      }}
      floatingLabelText="Search for places..."
      filter={AutoComplete.caseInsensitiveFilter}
      dataSource={words}
    />
  )
}

// CONNECT & EXPORT
const mapStateToProps = ({appReducer: {placesAvailable}}) => {
  let list = _.sortBy(placesAvailable, 'name').map(obj => {
    return obj
  })
  const placesIndexedByName = _.keyBy(list, 'name')
  const words = Object.keys(placesIndexedByName)
  return {placesIndexedByName, words}
}

export default connect(
  mapStateToProps,
  {
    setCurrentPlaceWoeid
  }
)(PlaceSelection)
