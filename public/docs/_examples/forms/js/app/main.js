// #docregion
(function(app) {
  document.addEventListener('DOMContentLoaded', function() {
    ng.platformBrowserDynamic.bootstrap(app.AppComponent,[
      ng.forms.disableDeprecatedForms(),
      ng.forms.provideForms()  
    ]);
  });
})(window.app || (window.app = {}));
