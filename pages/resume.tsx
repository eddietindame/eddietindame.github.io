import React from 'react'
import ResumeMD from 'markdown/resume.md'
import Head from 'next/head'

import { overrideComponents } from 'components/mdx'
import { Layout } from 'components/Layout'
import { HOST } from 'config'

const Resume = () => (
  <>
    <Head>
      <link rel="canonical" href={HOST + '/resume'} />
      <title>Eddie Tindame | Resume</title>
    </Head>
    <Layout narrow>
      <ResumeMD className="font-serif" components={overrideComponents} />
    </Layout>
  </>
)

export default Resume
