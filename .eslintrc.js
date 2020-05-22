module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint', 'react', 'react-hooks'],

  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },

  env: {
    es6: true,
    jest: true,
    node: true,
  },

  extends: ['plugin:react/recommended'],

  rules: {
    'react/prop-types': ['off'],
    'react/display-name': ['error', { ignoreTranspilerName: true }],
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: true,
      },
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'ignore',
        named: 'ignore',
        asyncArrow: 'ignore',
      },
    ],
    'max-len': ['error', { code: 120, tabWidth: 2 }],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    curly: ['error'],
  },

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/explicit-member-accessibility': ['off'],
        '@typescript-eslint/no-empty-interface': ['warn'],
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/member-delimiter-style': ['error', {
          multiline: {
            delimiter: 'none',
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
        }],
        '@typescript-eslint/no-use-before-define': ['warn', { functions: false, classes: true }],
        'no-async-promise-executor': 'warn',
        'no-case-declarations': 'off',
        'no-undef': 'off',
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: true,
            varsIgnorePattern: '^_$',
          },
        ],
      },
    },
  ],
}
