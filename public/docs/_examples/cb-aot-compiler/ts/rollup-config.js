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
  onwarn: function(warning) {
    // skip certain warnings

    // Should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }
    // Intercepts in some rollup versions
    if ( warning.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1 ) { return; }

    // console.warn everything else
    console.warn ? console.warn( warning.message ) : console.log( warning.message ) ;
  },
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
