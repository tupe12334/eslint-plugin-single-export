# eslint-plugin-single-export

An ESLint plugin that enforces a single export per file, promoting better module organization and clarity.

## Installation

```bash
pnpm add -D eslint-plugin-single-export
```

## Usage

### ESLint 9 Flat Config (eslint.config.js)

```javascript
import singleExport from 'eslint-plugin-single-export'

export default [
  {
    plugins: {
      'single-export': singleExport
    },
    rules: {
      'single-export/single-export': 'error'
    }
  }
]
```

### Recommended Config

```javascript
import singleExport from 'eslint-plugin-single-export'

export default [
  singleExport.configs.recommended
]
```

## Rule: single-export

This rule enforces that each file should have exactly one export statement.

### ✅ Valid

```javascript
// Single default export
export default function myFunction() {}

// Single named export
export const myConstant = 42

// Single export from another module
export { something } from './other-module'

// Single re-export all
export * from './other-module'

// CommonJS single export
module.exports = myFunction
```

### ❌ Invalid

```javascript
// Multiple exports
export const a = 1
export const b = 2

// Mixed default and named exports
export default function myFunction() {}
export const myConstant = 42

// Multiple default exports
export default class A {}
export default class B {}

// Multiple CommonJS exports
module.exports = a
exports.b = 2
```

## Why Single Exports?

- **Clarity**: Each file has a single, clear purpose
- **Discoverability**: Easier to understand what a module provides
- **Refactoring**: Simpler to move and reorganize code
- **Tree Shaking**: Better optimization in bundlers
- **Testing**: Easier to mock and test individual modules

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Lint the code
pnpm lint

# Release
pnpm release
```

## License

MIT