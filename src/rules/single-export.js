const rule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce a single export per file',
      category: 'Best Practices',
      recommended: true
    },
    fixable: undefined,
    schema: [],
    messages: {
      multipleExports: 'Only one export is allowed per file. Found {{count}} exports. Split functionality across multiple files following domain boundaries.',
      multipleDefaultExports: 'Multiple default exports are not allowed. Remove duplicate default exports and keep only one.',
      mixedExports: 'Cannot mix default and named exports in the same file. Choose either default export or named exports consistently.'
    }
  },
  create(context) {
    let exportCount = 0
    let hasDefaultExport = false
    let hasNamedExport = false
    const exportNodes = []

    function reportMultipleExports() {
      if (exportCount > 1) {
        exportNodes.forEach((node, index) => {
          if (index > 0) {
            context.report({
              node,
              messageId: 'multipleExports',
              data: {
                count: exportCount
              }
            })
          }
        })
      }
    }

    function checkMixedExports(node, isDefault) {
      if (isDefault) {
        if (hasDefaultExport) {
          context.report({
            node,
            messageId: 'multipleDefaultExports'
          })
        }
        hasDefaultExport = true
        if (hasNamedExport) {
          context.report({
            node,
            messageId: 'mixedExports'
          })
        }
      } else {
        hasNamedExport = true
        if (hasDefaultExport) {
          context.report({
            node,
            messageId: 'mixedExports'
          })
        }
      }
    }

    return {
      ExportDefaultDeclaration(node) {
        exportCount++
        exportNodes.push(node)
        checkMixedExports(node, true)
      },

      ExportNamedDeclaration(node) {
        if (node.declaration || (node.specifiers && node.specifiers.length > 0)) {
          // Only count local exports, not re-exports
          if (!node.source) {
            exportCount++
            exportNodes.push(node)
            checkMixedExports(node, false)
          }
        }
      },

      ExportAllDeclaration(_node) {
        // ExportAllDeclaration always has a source, so it's always a re-export
        // Don't count re-exports toward the export limit
      },

      AssignmentExpression(node) {
        if (
          node.left.type === 'MemberExpression' &&
          node.left.object.type === 'Identifier' &&
          node.left.object.name === 'module' &&
          node.left.property.type === 'Identifier' &&
          node.left.property.name === 'exports'
        ) {
          exportCount++
          exportNodes.push(node)
          checkMixedExports(node, false)
        }

        if (
          node.left.type === 'MemberExpression' &&
          node.left.object.type === 'Identifier' &&
          node.left.object.name === 'exports'
        ) {
          exportCount++
          exportNodes.push(node)
          checkMixedExports(node, false)
        }
      },

      'Program:exit'() {
        reportMultipleExports()
      }
    }
  }
}

export default rule