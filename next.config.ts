import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  output: 'export',
  sassOptions: {
    additionalData: `
      @import "variables";
      @import "bootstrap/scss/functions";
      @import "bootstrap/scss/variables";
      @import "bootstrap/scss/mixins";
    `.trim(),
    includePaths: ['node_modules/', 'scss/'],
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
  },
})

export default withMDX(nextConfig)
