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
import LinearProgress from 'material-ui/LinearProgress';

//
// COMPONENT
//

const TrendsList = ({
  trends,
  setCurrentTrend,
  resetTweets,
  totalVolume
}) => {
  return (
    <Menu
      // onChange={(event, trend) => {
      //   console.log('taaaa race')
      //   const promise = new Promise(function (resolve, reject) {
      //     resolve(
      //       // UPDATE
      //       setCurrentTrend(trend)
      //     )
      //   })
      //   promise.then((trend) => {
      //     // RESET TWEETS
      //     resetTweets()
      //     getTweetStream()
      //   })
      // }}
    >
      {
        trends.map((trend, index) =>{
          return (
            <div key={index}>
              <MenuItem
                value={trend.name}
                primaryText={trend.name}
                title={trend.tweet_volume}
                onClick={() => {
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
                }}
              />
              <LinearProgress mode="determinate" value={trend.tweet_volume * 100 / totalVolume} />
            </div>
          )
        })
      }
    </Menu>
  )
}

// CONNECT & EXPORT
const mapStateToProps = ({appReducer: {trends}}) => {
  let totalVolume = 0
  let list = _.orderBy(trends.trends, 'tweet_volume', 'desc').filter(obj => {
    if (obj && obj.tweet_volume) {
      totalVolume += obj.tweet_volume
      console.log(obj.tweet_volume)
      return obj
    }
  })
  console.log(list)
  return {trends: list, totalVolume}
}

export default connect(
  mapStateToProps,
  {
    setCurrentTrend,
    resetTweets
  }
)(TrendsList)
