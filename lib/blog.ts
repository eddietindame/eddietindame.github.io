import { getBaseSlug, modifyRomanSlug } from 'lib/roman'

export const getSeriesMap = (slugs: string[]) => {
  const seriesMap = {} as Record<string, string[]>

  for (const slug of slugs) {
    const basename = getBaseSlug(slug)
    if (seriesMap[basename]) {
      seriesMap[basename].push(slug)
      seriesMap[basename].sort()
    } else seriesMap[basename] = [slug]
  }

  return seriesMap
}

export const getAdjacentSeriesPosts = (slug: string, slugs: string[]) => {
  const seriesMap = getSeriesMap(slugs)
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
