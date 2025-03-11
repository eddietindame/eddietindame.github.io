import React from 'react'
import Head from 'next/head'
import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

import client from 'tina/__generated__/client'
import { ResumeQuery } from 'tina/__generated__/types'
import { overrideComponents } from 'components/mdx'
import { Layout } from 'components/Layout'
import { TinaProps } from 'types/shared'
import { HOST } from 'config'

type ResumeProps = TinaProps<ResumeQuery>

const Resume = (props: ResumeProps) => {
  const {
    data: { resume },
  } = useTina(props)

  return (
    <>
      <Head>
        <link rel="canonical" href={HOST + '/resume'} />
        <title>Eddie Tindame | Resume</title>
      </Head>
      <Layout narrow>
        <TinaMarkdown components={overrideComponents} content={resume.body} />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  let data = {} as ResumeQuery
  let query = ''
  let variables = { relativePath: 'resume.md' }
  try {
    const res = await client.queries.resume(variables)
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

export default Resume
