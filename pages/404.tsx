import React from 'react'
import Head from 'next/head'
import { Layout } from 'components/Layout'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Eddie Tindame | 404 | Page not found</title>
      </Head>
      <Layout className="h-screen">
        <div className="flex flex-1 items-center justify-center">
          <h1 className="text-3xl">404 - This is not the page you are looking for.</h1>
        </div>
      </Layout>
    </>
  )
}
