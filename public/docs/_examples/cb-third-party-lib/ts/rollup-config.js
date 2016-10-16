// #docregion
import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify'

//paths are relative to the execution path
export default {
  entry: 'app-aot/main-aot.js',
  dest: 'dist/build.js', // output a single application bundle
  sourceMap: true,
  sourceMapFile: 'dist/build.js.map',
  format: 'iife',
  plugins: [
    // #docregion nodeResolve
    nodeResolve({jsnext: true, module: true}),
    // #enddocregion nodeResolve
    commonjs({
      include: ['node_modules/rxjs/**']
    }),
    uglify()
  ]
}
