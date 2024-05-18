import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import withGA from 'next-ga'
import NProgress from 'next-nprogress/component'
import { PageTransition } from 'next-page-transitions'
import Nav from '~components/Nav'
import Heart from '~components/Heart'
import { GA_TRACKING_ID } from '~config'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <NProgress color="#000000" spinner={false} />
        <Nav />
        <PageTransition timeout={300} classNames="page-transition" skipInitialTransition>
          <Component {...pageProps} key={typeof window === 'undefined' ? '' : Router.route} />
        </PageTransition>
        <Heart
          size={25}
          colour="#C03A2B"
          // accent="#ED7161"
        />
      </>
    )
  }
}

export default withGA(GA_TRACKING_ID, Router)(MyApp)
