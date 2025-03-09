import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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

export default nextConfig
