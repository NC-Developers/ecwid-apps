import build from '../../scripts/esbuild.js'

const files = [{
  from: 'src/index.ts',
  to: 'dst/aqua8.js',
  format: 'iife',
}]

for (const file of files) {
  build(file)
}