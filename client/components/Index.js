//
// IMPORTS
//

import React from 'react'
import { connect } from 'react-redux'
import PlaceSelection from './PlaceSelection'

//
// COMPONENT
//

const Index = () => (
  <div className="container">
    <header>
        <h1>Twitter trends</h1>
        <PlaceSelection />
    </header>
  </div>
)

//
// EXPORT
//

export default connect()(Index)