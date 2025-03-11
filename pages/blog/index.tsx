import React from 'react'
import Head from 'next/head'

import client from 'tina/__generated__/client'
import { Layout } from 'components/Layout'
import { BlogPostItem, BlogPostItemProps } from 'components/BlogPostItem'
import { HOST } from 'config'

type BlogProps = {
  posts: BlogPostItemProps[]
}

const Blog = ({ posts }: BlogProps) => (
  <>
    <Head>
      <link rel="canonical" href={HOST + '/blog'} />
      <title>Eddie Tindame | Blog</title>
    </Head>
    <Layout narrow>
      <h1 className="mb-3 text-3xl">Blog</h1>
      {posts.map(post => (
        <BlogPostItem key={post.slug} {...post} />
      ))}
    </Layout>
  </>
)

export async function getStaticProps(): Promise<{ props: BlogProps }> {
  const postsListData = await client.queries.postConnection()
  const posts = postsListData.data.postConnection.edges.map(post => ({
    slug: post.node._sys.filename,
    title: post.node.title,
    description: post.node.description,
    date: post.node.date,
  }))

  return {
    props: {
      posts,
    },
  }
}

export default Blog
