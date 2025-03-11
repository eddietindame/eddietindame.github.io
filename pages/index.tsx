import React from 'react'
import Head from 'next/head'
import { useTina } from 'tinacms/dist/react'

import client from 'tina/__generated__/client'
import { AboutQuery } from 'tina/__generated__/types'
import Landing from 'components/Landing'
import About from 'components/About'
import Contact from 'components/Contact'
import { TinaProps } from 'types/shared'
import { HOST } from 'config'

type IndexProps = TinaProps<AboutQuery>

const Index = (props: IndexProps) => {
  const {
    data: { about },
  } = useTina(props)

  return (
    <>
      <Head>
        <link rel="canonical" href={HOST} />
        <title>Eddie Tindame | Full Stack Developer</title>
      </Head>
      <div id="index" className="index">
        <div className="container-fluid">
          <Landing />
          <About content={about} />
          <Contact />
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  let data = {} as AboutQuery
  let query = ''
  let variables = { relativePath: 'about.md' }
  try {
    const res = await client.queries.about(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch {}

  return {
    props: {
      data,
      query,
      variables,
    },
  }
}

export default Index
