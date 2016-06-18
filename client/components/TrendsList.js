//
// MODULE
//

import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {getTweetStream} from '../actions/api.js'
//
// COMPONENT
//

const TrendsList = ({
  trends,
  getTweetStream,
  dispatch
}) => {
  return (
    <ul style={{
      maxHeight: '90vh',
      overflow: 'auto'
    }}>
      {trends.map((trend, index) =>{
        return (
          <li 
            key={index}
            onClick={(e) => {
              e.preventDefault()
              const promise = new Promise(function (resolve, reject) {
                resolve(
                  // UPDATE
                  dispatch({
                    type: 'SET_CURRENT_TREND',
                    trend: trend
                  })
                )
              })
              promise.then((trend) => {
                // RESET TWEETS
                dispatch({
                  type: 'RESET_TWEETS'
                })
                getTweetStream()
              })
            }}
          >{trend.name}</li>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {dispatch, getTweetStream}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendsList) 