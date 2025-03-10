import path from 'path'
import fs from 'fs'
import { getBaseSlug, modifyRomanSlug } from 'lib/roman'

const blogPostsDirectory = path.join(process.cwd(), '/markdown/posts')

const blogPostFilenames = fs.readdirSync(blogPostsDirectory)

const blogPostPaths = blogPostFilenames.map(filename => ({
  params: { slug: filename.replace(/\.md$/, '') },
}))

export const getSeriesMap = () => {
  const seriesMap = {} as Record<string, string[]>

  for (const filename of blogPostFilenames) {
    const slug = filename.replace('.md', '')
    const basename = getBaseSlug(slug)
    if (seriesMap[basename]) {
      seriesMap[basename].push(slug)
      seriesMap[basename].sort()
    } else seriesMap[basename] = [slug]
  }

  return seriesMap
}

export const getAdjacentSeriesPosts = (slug: string) => {
  const seriesMap = getSeriesMap()
  const basename = getBaseSlug(slug)

  if (seriesMap[basename]?.length > 1) {
    const index = seriesMap[basename].indexOf(slug)
    return {
      prev: index > 0 ? modifyRomanSlug(slug, 'subtract') : null,
      next: index + 1 < seriesMap[basename].length ? modifyRomanSlug(slug, 'add') : null,
    }
  } else
    return {
      prev: null,
      next: null,
    }
}

export const getBlogPaths = () => ({
  postsDirectory: blogPostsDirectory,
  filenames: blogPostFilenames,
  paths: blogPostPaths,
})
