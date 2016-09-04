//
// IMPORTS
//

import React from 'react'
import { connect } from 'react-redux'
import PlaceSelection from './PlaceSelection'
import TrendsList from './TrendsList'
import TweetsList from './TweetsList'
import Header from './Header'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
//
// COMPONENT
//

const Index = () => {
    const styles = {
        header: {
            height: '10vh'
        },
        box: {
            height: '90vh',
            overflowY: 'auto'
        }
    }
    return (
    <MuiThemeProvider>
        <div>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div
                        style={styles.header}
                        className="box"
                    >
                        <Header />
                    </div>
                </div>
            </div>

            <div className="row">
              <div
                className="col-xs-3 col-sm-3 col-md-3 col-lg-3"
                style={styles.box}
              >
                <div className="box">
                  <PlaceSelection />
                  <TrendsList />
                </div>
              </div>

              <div
                className="col-xs-9 col-sm-9 col-md-9 col-lg-9"
                style={styles.box}
              >
                <div className="box">
                  <TweetsList />
                </div>
              </div>
            </div>

        </div>
    </MuiThemeProvider>
)}

//
// EXPORT
//

export default connect()(Index)
