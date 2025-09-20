import plugin from './src/index.js'

export default [
  {
    files: ['src/rules/examples/**/*.js'],
    plugins: {
      'single-export': plugin
    },
    rules: {
      'single-export/single-export': 'error'
    }
  },
  {
    files: ['src/**/*.js'],
    ignores: ['src/rules/examples/**/*.js'],
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    }
  }
]