import React from 'react'
import ReactDOM from 'react-dom'
import Loader from '../src/Loader'

ReactDOM.render(
  <div>
    <Loader size={40} />
    <Loader>
      <div>
        <p>Some content</p>
      </div>
    </Loader>
  </div>,
  document.getElementById('root')
)
