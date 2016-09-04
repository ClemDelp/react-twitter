//
// MODULE
//

import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';

//
// COMPONENT
//

const TweetsList = ({
  tweets,
  dispatch
}) => {
  const styles = {
    paper: {
      width: '100%',
      padding: '10px',
      marginTop: 10,
      display: 'inline-block'
    },
    chip: {
      margin: 4
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap'
    }
  }
  return (
    <div>
      {
        tweets.map((tweet, index) => {
          return (
            <Paper
              key={index}
              style={styles.paper}
              zDepth={1}
              rounded={false}
            >
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="box">
                      <Chip
                        onTouchTap={() => {}}
                        style={styles.chip}
                      >
                        <Avatar src={tweet.user.profile_image_url} />
                        {tweet.user.screen_name}
                      </Chip>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="box">
                      {tweet.text}
                      <FlatButton
                        label="see on Twitter"
                        primary={true}
                        href={tweet.source}
                      />
                    </div>
                </div>
              </div>
            </Paper>
          )
        }
      )}
    </div>
  )
}

// CONNECT & EXPORT
const mapStateToProps = ({appReducer: {tweets}}) => {
  let _tweets = [...tweets]
  _tweets = _tweets.slice(0, 10)
  // const list = _.sortBy(tweets, 'timestamp_ms').map(obj => {
  //   return obj
  // })

  return {tweets: _tweets.reverse()}
}

export default connect(
  mapStateToProps
)(TweetsList)
