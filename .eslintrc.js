module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['react'],
  parser: '@babel/eslint-parser',
  ignorePatterns: ['yarn.lock', '.next/', 'out/', 'node_modules/', 'next.config.js']
}
