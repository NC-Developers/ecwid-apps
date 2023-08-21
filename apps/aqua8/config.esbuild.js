import build from '../../scripts/esbuild.js'

const files = [{
  from: 'src/index.ts',
  to: 'dst/index.js',
  format: 'iife',
}]

for (const file of files) {
  build(file)
}