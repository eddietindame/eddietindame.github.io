import React from 'react'
import type { AppProps } from 'next/app'
import { GoogleAnalytics } from '@next/third-parties/google'
import PageTransition, { useAsPathWithoutHash } from '@madeinhaus/nextjs-page-transition'
import '@madeinhaus/nextjs-page-transition/dist/index.css'

import { GA_TRACKING_ID, TRANSITION_DURATION } from 'config'
import Nav from 'components/Nav'
import 'scss/index.scss'
import 'css/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const key = useAsPathWithoutHash()

  return (
    <>
      <Nav />
      <PageTransition inPhaseDuration={TRANSITION_DURATION} outPhaseDuration={TRANSITION_DURATION}>
        <Component {...pageProps} key={key} />
      </PageTransition>
      <GoogleAnalytics gaId={GA_TRACKING_ID} />
    </>
  )
}
