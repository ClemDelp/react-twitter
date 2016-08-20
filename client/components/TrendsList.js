//
// MODULE
//
import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {getTweetStream} from '../actions/api.js'
import {
  setCurrentTrend,
  resetTweets
} from '../reducers/index'

// MATERIAL UI
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

//
// COMPONENT
//

const TrendsList = ({
  trends,
  setCurrentTrend, 
  resetTweets
}) => {
  return (
    <Menu onChange={(event, trend) => {
      const promise = new Promise(function (resolve, reject) {
        resolve(
          // UPDATE
          setCurrentTrend(trend)
        )
      })
      promise.then((trend) => {
        // RESET TWEETS
        resetTweets()
        getTweetStream()
      })
    }}>
      {
        trends.map((trend, index) =>{
          return (
            <MenuItem
              key={index}
              value={trend.name}
              primaryText={trend.name}
            />
          )  
        })
      }
    </Menu>
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
  mapStateToProps,
  {
    setCurrentTrend, 
    resetTweets
  }
)(TrendsList) 
