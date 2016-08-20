//
// IMPORTS
//

import React from 'react'
import { connect } from 'react-redux'
import PlaceSelection from './PlaceSelection'
import TrendsList from './TrendsList'
import TweetsList from './TweetsList'
import Footer from './Footer'
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
            height: '85vh',
            overflowY: 'auto'
        },
        footer: {
            height: '5vh'
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
                    className="col-xs-2 col-sm-2 col-md-2 col-lg-2"
                    style={styles.box}
                >
                    <div className="box">
                        <PlaceSelection />
                    </div>
                </div>
                <div 
                    className="col-xs-2 col-sm-2 col-md-2 col-lg-2"
                    style={styles.box}
                >
                    <div className="box">
                        <TrendsList />
                    </div>
                </div>
                <div 
                    className="col-xs-8 col-sm-8 col-md-8 col-lg-8"
                    style={styles.box}
                >
                    <div className="box">
                        <TweetsList />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <div
                        style={styles.header}
                        className="box"
                    >
                        <Footer />
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