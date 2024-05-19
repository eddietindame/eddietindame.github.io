module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['yarn.lock', '.next/', 'out/', 'node_modules/', 'next.config.js'],
  root: true,
  settings: {
    react: {
      version: 'detect'
    }
  }
}
