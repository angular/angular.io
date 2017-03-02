// #docregion
import angularInline from 'rollup-plugin-angular-inline';

export default {
  entry: './dist/index.js',
  dest: './bundles/hero-profile.umd.js',
  format: 'umd',
  moduleName: 'heroProfile',
  globals: {
    '@angular/core': 'ng.core'
  },
  plugins: [
    angularInline({ include: './dist/**/*.component.js' })
  ]
}
