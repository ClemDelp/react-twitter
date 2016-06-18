//
// MODULE
//

import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

//
// COMPONENT
//

const TweetsList = ({
  tweets,
  dispatch
}) => {
  return (
    <div style={{
      maxHeight: '90vh',
      overflow: 'auto'
    }}>
      {tweets.map((tweet, index) =>{
        return (
          <div key={index}>
            <div>{tweet.text}</div>
            <hr />
          </div>
        )  
      })}
    </div>
  )
}

// CONNECT & EXPORT
const mapStateToProps = ({appReducer: {tweets}}) => {
  const list = _.sortBy(tweets, 'timestamp_ms').map(obj => {
    return obj
  }).reverse()
  return {tweets: list}
}

export default connect(
  mapStateToProps
)(TweetsList)