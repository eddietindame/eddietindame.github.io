import React from 'react'

// Mock the SpinningNumber component for testing
const SpinningNumber = ({ children, ...props }) => {
  return React.createElement('span', props, children)
}

export default SpinningNumber
