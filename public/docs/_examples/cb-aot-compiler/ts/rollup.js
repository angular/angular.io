// #docregion
import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify'

// #docregion config
export default {
  entry: 'app/main.js',
  dest: 'dist/build.js', // output a single application bundle
  sourceMap: false,
  format: 'iife',
  plugins: [
      nodeResolve({jsnext: true, module: true}),
      // #docregion commonjs
      commonjs({
        include: 'node_modules/rxjs/**',
      }),
      // #enddocregion commonjs
      // #docregion uglify
      uglify()
      // #enddocregion uglify
  ]
}
// #enddocregion config