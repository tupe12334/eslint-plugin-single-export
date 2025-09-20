import { RuleTester } from 'eslint'
import { describe, it } from 'vitest'
import rule from './single-export'

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  }
})

describe('single-export rule', () => {
  it('should pass valid cases', () => {
    ruleTester.run('single-export', rule, {
      valid: [
        // Single default export
        'export default function foo() {}',
        'export default class Foo {}',
        'export default 42',
        'const foo = 42; export default foo',

        // Single named export
        'export const foo = 42',
        'export function foo() {}',
        'export class Foo {}',
        'const foo = 42; export { foo }',

        // Single export with declaration
        'export { foo } from "./other"',
        'export * from "./other"',

        // CommonJS single export
        'module.exports = 42',
        'exports.foo = 42',

        // No exports
        'const foo = 42',
        'function foo() {}'
      ],
      invalid: [
        // Multiple default exports
        {
          code: 'export default 1; export default 2',
          errors: [
            { messageId: 'multipleDefaultExports' },
            { messageId: 'multipleExports' }
          ]
        },

        // Multiple named exports
        {
          code: 'export const a = 1; export const b = 2',
          errors: [{ messageId: 'multipleExports' }]
        },

        // Mixed exports
        {
          code: 'export default 1; export const foo = 2',
          errors: [
            { messageId: 'mixedExports' },
            { messageId: 'multipleExports' }
          ]
        },

        // Multiple export statements
        {
          code: 'const a = 1, b = 2; export { a }; export { b }',
          errors: [{ messageId: 'multipleExports' }]
        },

        // Export all with other exports
        {
          code: 'export * from "./other"; export const foo = 1',
          errors: [{ messageId: 'multipleExports' }]
        },

        // CommonJS multiple exports
        {
          code: 'module.exports = 1; exports.foo = 2',
          errors: [{ messageId: 'multipleExports' }]
        },

        // Complex case with multiple violations
        {
          code: `
            export default function foo() {}
            export const bar = 1
            export { baz } from "./other"
          `,
          errors: [
            { messageId: 'mixedExports' },
            { messageId: 'multipleExports' },
            { messageId: 'multipleExports' }
          ]
        }
      ]
    })
  })
})