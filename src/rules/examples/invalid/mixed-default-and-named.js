// Invalid: Mixed default and named exports
export default function mainFunction() {
  return 'main'
}

export const helper = 'helper function'
export const config = { debug: true }