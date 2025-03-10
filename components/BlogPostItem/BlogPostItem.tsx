import React from 'react'
import Link from 'next/link'

export type BlogPostMetaData = {
  title: string
  description: string
  date: string
}

export type BlogPostItemProps = BlogPostMetaData & {
  slug: string
}

export const BlogPostItem = ({ slug, title, description, date }: BlogPostItemProps) => (
  <div>
    <Link href={'/blog/' + slug}>
      <h2 className="inline">{title}</h2>
      <br />
      <div className="inline-block">{description}</div>
      <br />
      <div className="mb-3 inline-block border-b pb-3">{date}</div>
    </Link>
  </div>
)
