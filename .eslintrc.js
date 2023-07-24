module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    'eslint:recommended',
    'react-app',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'next',
    'plugin:jest/recommended',
    'plugin:testing-library/react',
    'plugin:jsx-a11y/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'react',
    'react-hooks',
    'jsx-a11y',
    'jest',
    'testing-library',
    'tailwindcss',
    '@typescript-eslint',
    'prettier',
    'no-relative-import-paths',
  ],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/migration-from-tailwind-2': 'off',
    'no-relative-import-paths/no-relative-import-paths': [
      'warn',
      { allowSameFolder: false, rootDir: 'src', prefix: '' },
    ],
  },
};
