module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  'extends': [
    'plugin:react/recommended',
    "eslint:recommended",
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'react/prop-types': 0,
    'indent': [
      'error',
      2
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    // 'linebreak-style': [
    //   'error',
    //   'windows'
    // ],
    // 'quotes': [
    //   'error',
    //   'single'
    // ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    // 'no-trailing-spaces': 'error',
    // 'object-curly-spacing': [
    //   'error', 'always'
    // ],
    // 'arrow-spacing': [
    //   'error', { 'before': true, 'after': true }
    // ],
  }
}
