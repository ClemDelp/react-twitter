//
// MODULE
//

import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

//
// COMPONENT
//

const TrendsList = ({
  trends,
  dispatch
}) => {
  return (
    <ul>
      {trends.map((trend, index) =>{
        return (
          <li key={index}>{trend.name}</li>
        )  
      })}
    </ul>
  )
}

// CONNECT & EXPORT
const mapStateToProps = ({appReducer: {trends}}) => {
  let list = _.sortBy(trends.trends, 'tweet_volume').map(obj => {
    return obj
  })
  return {trends: list}
}

export default connect(
  mapStateToProps
)(TrendsList) 