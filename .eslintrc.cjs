module.exports = {
  root: true,
  env: { browser: true, es2020: true, 'vitest-globals/env': true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:vitest-globals/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 2021, sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'vitest'],
  rules: {
    'react/prop-types': 0,
    'react/no-unescaped-entities': 0,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
