import singleExport from './rules/single-export.js'

const plugin = {
  meta: {
    name: 'eslint-plugin-single-export',
    version: '1.0.0'
  },
  rules: {
    'single-export': singleExport
  },
  configs: {
    recommended: {
      plugins: {
        'single-export': {
          rules: {
            'single-export': singleExport
          }
        }
      },
      rules: {
        'single-export/single-export': 'error'
      }
    }
  }
}

export default plugin