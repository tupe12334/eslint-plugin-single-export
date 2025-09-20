# ESLint Plugin Single Export - Examples

This directory contains examples showing valid and invalid export patterns for the `single-export` rule.

## How to see the errors in your IDE

1. **Make sure ESLint extension is installed** in your IDE (VS Code, etc.)
2. **Run the linter** to see errors: `pnpm lint:examples`
3. **Check IDE settings** - ensure ESLint is enabled for JavaScript files
4. **Restart your IDE** if needed to pick up the new configuration

## Test Files

### ✅ Valid Examples (`/valid/`)
These files should show **no errors**:
- Single default exports
- Single named exports
- Single re-exports
- Single CommonJS exports

### ❌ Invalid Examples (`/invalid/`)
These files should show **ESLint errors**:
- Multiple exports (various types)
- Mixed default and named exports
- Multiple default exports
- Mixed ES6 and CommonJS exports

## Expected Errors

When the rule is working correctly, you should see errors like:
- `Only one export is allowed per file. Found X exports.`
- `Cannot mix default and named exports in the same file.`
- `Multiple default exports are not allowed.`

## Troubleshooting

If you don't see errors in your IDE:

1. Check that ESLint is running: `pnpm lint:examples`
2. Restart your IDE
3. Check IDE ESLint extension settings
4. Ensure `eslint.config.js` is being detected by your IDE