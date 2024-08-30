import React from 'react'

import Orb from './components/orb/Orb'
import Navigation from './components/navigation/Navigation'

const App = () => {
  return (
    <>

      <div className="content">
        <Orb />
        <div className="container">
          <Navigation />

        </div>
      </div>

    </>
  )
}

export default App