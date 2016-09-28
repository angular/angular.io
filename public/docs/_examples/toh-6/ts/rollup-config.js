// #docregion
import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify'

//paths are relative to the execution path
export default {
  entry: '../../toh-6/ts/app/main-aot.js',
  dest: 'dist/build.js', // output a single application bundle
  sourceMap: true,
  sourceMapFile: 'dist/build.js.map',
  format: 'iife',
  plugins: [
      nodeResolve({jsnext: true, module: true}),
      commonjs({
        include: ['../../toh-6/ts/node_modules/rxjs/**', '../../toh-6/ts/node_modules/angular-in-memory-web-api/**'],
      }),
      uglify()
  ]
}
