const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const nextSass = require('@zeit/next-sass')
const sass = require('node-sass')
const sassUtils = require('node-sass-utils')(sass)
const sassVars = require('./config/theme.js')

const nextConfig = {
    webpack: config => {
        config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|gif)$/, // jpg handled by next-optimized-images
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: '[name].[ext]'
                }
            }
        })
        return config
    }
}

module.exports = withPlugins([
    optimizedImages,
    [nextSass, {
        sassLoaderOptions: {
            includePaths: ['node_modules/', 'scss/'],
            data: `
                @import "variables";
                @import "bootstrap/scss/functions";
                @import "bootstrap/scss/variables";
                @import "bootstrap/scss/mixins";
            `,
            functions: {
                'get($keys)': function(keys) {
                    keys = keys.getValue().split(".")
                    let result = sassVars
                    for (let i = 0; i < keys.length; i++) {
                        result = result[keys[i]]
                    }
                    result = sassUtils.castToSass(result)
                    return result
                }
            }
        }
    }]
], nextConfig)
