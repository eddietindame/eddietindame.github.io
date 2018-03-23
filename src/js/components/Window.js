import React, { Component } from 'react'
import PointTarget from 'react-point'

export default class Window extends Component {

    getClass() {
        let classList = ''
        classList += this.props.left ? ' window-img--left' : ''
        classList += this.props.right ? ' window-img--right' : ''
        classList += this.props.centre ? ' window-img--centre' : ''
        classList += this.props.onTop ? ' js-ontop' : ''
        return classList
    }

  render() {
    return (
        <PointTarget onPoint={ this.props.onClick }>
            <div className={`window-img${this.getClass()}`}>
                { this.props.children }
            </div>
        </PointTarget>
    )
  }
}
