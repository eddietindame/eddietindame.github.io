import React from 'react'
import Head from 'next/head'
import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

import client from 'tina/__generated__/client'
import { PostQuery } from 'tina/__generated__/types'
import { A, overrideComponents } from 'components/mdx'
import { Layout } from 'components/Layout'
import { getAdjacentSeriesPosts } from 'lib/blog'
import { formatDate } from 'lib/utils'
import { TinaProps } from 'types/shared'
import { HOST } from 'config'

type BlogPostProps = TinaProps<PostQuery> & {
  slug: string
  prev: string | null
  next: string | null
}

const BlogPost = ({ slug, prev, next, ...props }: BlogPostProps) => {
  const {
    data: { post },
  } = useTina(props)

  return (
    <>
      <Head>
        <link rel="canonical" href={`${HOST}/blog/${slug}`} />
        <title>Eddie Tindame | Blog | {post.title}</title>
      </Head>
      <Layout className="blog-post">
        <h1 className="text-2xl sm:text-3xl">{post.title}</h1>
        <div>{post.description}</div>
        <div>{formatDate(post.date)}</div>
        <hr className="my-4" />
        <TinaMarkdown components={overrideComponents} content={post.body} />
        {prev && (
          <em>
            <A url={'/blog/' + prev}>This post is a continuation of a series...</A>
          </em>
        )}
        {next && (
          <em>
            <A url={'/blog/' + next}>This series is continued here...</A>
          </em>
        )}
        <hr className="my-4" />
      </Layout>
    </>
  )
}

export const getStaticPaths = async () => {
  const postsListData = await client.queries.postConnection()

  return {
    paths: postsListData.data.postConnection.edges.map(post => ({
      params: { slug: post.node._sys.filename },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }): Promise<{ props: BlogPostProps }> {
  const postsListData = await client.queries.postConnection()
  const slugs = postsListData.data.postConnection.edges.map(post => post.node._sys.filename)
  const { prev, next } = getAdjacentSeriesPosts(params.slug, slugs)
  let data = {} as PostQuery
  let query = ''
  let variables = { relativePath: `${params.slug}.md` }
  try {
    const res = await client.queries.post(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch {}

  return {
    props: {
      slug: params.slug,
      variables,
      data,
      query,
      prev,
      next,
    },
  }
}

export default BlogPost
