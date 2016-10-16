// #docregion
export default {
  entry: './public/docs/_examples/cb-third-party-lib/hero-profile/index.js',
  dest: './public/docs/_examples/cb-third-party-lib/hero-profile/bundles/hero-profile.umd.js',
  format: 'umd',
  moduleName: 'ng.heroProfile',
  globals: {
    '@angular/core': 'ng.core'
  }
}