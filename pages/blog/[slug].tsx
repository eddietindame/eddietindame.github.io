import React from 'react'
import Head from 'next/head'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import path from 'path'
import fs from 'fs'

import { BlogPostMetaData } from 'components/BlogPostItem'
import { A, overrideComponents } from 'components/mdx'
import { Layout } from 'components/Layout'
import { getAdjacentSeriesPosts, getBlogPaths } from 'lib/blog'
import { formatDate } from 'lib/utils'
import { HOST } from 'config'

type BlogPostProps = {
  slug: string
  markdown: string
  metadata: BlogPostMetaData
  scope: Record<string, unknown>
  prev: string | null
  next: string | null
}

const BlogPost = ({ slug, markdown, metadata, scope, prev, next }: BlogPostProps) => (
  <>
    <Head>
      <link rel="canonical" href={`${HOST}/blog/${slug}`} />
      <title>Eddie Tindame | Blog | {metadata.title}</title>
    </Head>
    <Layout className="blog-post">
      <h1 className="text-2xl sm:text-3xl">{metadata.title}</h1>
      <div>{metadata.description}</div>
      <div>{formatDate(metadata.date)}</div>
      <hr className="my-4" />
      <MDXRemote
        compiledSource={markdown}
        frontmatter={metadata}
        scope={scope}
        components={overrideComponents}
      />
      {prev && (
        <em>
          <A href={'/blog/' + prev}>This post is a continuation of a series...</A>
        </em>
      )}
      {next && (
        <em>
          <A href={'/blog/' + next}>This series is continued here...</A>
        </em>
      )}
      <hr className="my-4" />
    </Layout>
  </>
)

export async function getStaticPaths() {
  const { paths } = getBlogPaths()
  return { paths, fallback: false }
}

export async function getStaticProps({ params }): Promise<{ props: BlogPostProps }> {
  const { prev, next } = getAdjacentSeriesPosts(params.slug)
  const { postsDirectory } = getBlogPaths()
  const filePath = path.join(postsDirectory, `${params.slug}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { compiledSource, frontmatter, scope } = await serialize<
    Record<string, unknown>,
    BlogPostMetaData
  >(fileContents, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
      format: 'md',
    },
  })

  return {
    props: {
      slug: params.slug,
      markdown: compiledSource,
      metadata: frontmatter,
      scope,
      prev,
      next,
    },
  }
}

export default BlogPost
