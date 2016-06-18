//
// IMPORTS
//

import React from 'react'
import { connect } from 'react-redux'
import PlaceSelection from './PlaceSelection'
import TrendsList from './TrendsList'
import TweetsList from './TweetsList'

//
// COMPONENT
//

const Index = () => (
  <div className="container">
    <header>
        <h1>Twitter trends</h1>
        <PlaceSelection />
        <table height='90vh'>
        	<tbody>
	        	<tr>
	        		<td><TrendsList /></td>
	        		<td>
	        			<strong>Tweets stream</strong>
	        			<TweetsList />
	        		</td>
	        	</tr>
        	</tbody>
        </table>
    </header>
  </div>
)

//
// EXPORT
//

export default connect()(Index)