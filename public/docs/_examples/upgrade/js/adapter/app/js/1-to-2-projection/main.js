(function(app) {
  'use strict';
  
  app.upgradeAdapter.bootstrap(
    document.querySelector('hero-app'),
    ['heroApp'],
    {strictDi: true}
  );

})(window.app || (window.app = {}));
