module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true 
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    '@typescript-eslint'
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn', 
      { 
        varsIgnorePattern: '^React$', 
        argsIgnorePattern: '^_' 
      }
    ],
    'prefer-const': 'warn',
    'no-prototype-builtins': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'off'
  },
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off'
      }
    }
  ]
};
