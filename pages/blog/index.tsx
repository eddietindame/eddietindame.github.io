import React from 'react'
import Head from 'next/head'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import fs from 'fs'

import { HOST } from 'config'
import { getBlogPaths } from 'lib/blog'
import { Layout } from 'components/Layout'
import { BlogPostItem, BlogPostItemProps, BlogPostMetaData } from 'components/BlogPostItem'

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
  const { filenames, postsDirectory } = getBlogPaths()
  const posts = (
    await Promise.all(
      filenames.map(async filepath => {
        const fileContents = fs.readFileSync(path.join(postsDirectory, filepath), 'utf8')
        const { frontmatter } = await serialize<Record<string, unknown>, BlogPostMetaData>(
          fileContents,
          { parseFrontmatter: true },
        )

        return {
          slug: filepath.replace(/\.md$/, ''),
          title: frontmatter.title,
          description: frontmatter.description,
          date: frontmatter.date,
        }
      }),
    )
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return {
    props: {
      posts,
    },
  }
}

export default Blog
