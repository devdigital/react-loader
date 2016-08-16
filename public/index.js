import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Loader from '../src/Loader'

ReactDOM.render(
  <div>
    <Loader size={40} text="Loading" loading />
    <Loader size={20} text="Loading" color="#c0c" height={100} loading>
      <div>
        <p>Some content</p>
        <p>Some content</p>
        <p>Some content</p>
        <p>Some content</p>
      </div>
    </Loader>
    <Loader loading overlay={false}>
      <p>Some content</p>
    </Loader>
  </div>,
  document.getElementById('root')
)
