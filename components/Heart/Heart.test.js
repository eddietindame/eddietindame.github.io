/* eslint-disable react/no-deprecated */
import React from 'react'
import ReactDOM from 'react-dom'
import Heart from './Heart'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Heart />, div)
  ReactDOM.unmountComponentAtNode(div)
})
