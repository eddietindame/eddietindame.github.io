import React from 'react'
import Head from 'next/head'
import { Layout } from 'components/Layout'

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Eddie Tindame | 500 | Internal server error</title>
      </Head>
      <Layout className="h-screen">
        <div className="flex flex-1 items-center justify-center">
          <h1 className="text-3xl">500 - Aw hell naw.</h1>
        </div>
      </Layout>
    </>
  )
}
