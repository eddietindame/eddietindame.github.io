import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import next from '@next/eslint-plugin-next'
import prettier from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  { ignores: ['.next/', 'out/'] },
  ...tseslint.configs.recommended,
  reactHooks.configs.flat['recommended-latest'],
  {
    plugins: { '@next/next': next },
    rules: { ...next.configs.recommended.rules },
  },
  prettier,
)
