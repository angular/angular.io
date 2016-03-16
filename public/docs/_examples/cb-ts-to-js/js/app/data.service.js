(function(app) {

  function DataService() {
  }
  DataService.annotations = [
    new ng.core.Injectable()
  ];
  DataService.prototype.getHeroName = function() {
    return 'Windstorm';
  };
  app.DataService = DataService;

})(window.app = window.app || {});
