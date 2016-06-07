declare var angular: any;

angular.module('heroApp', [])
  .controller('MainCtrl', function() {
    this.message = 'Hello world';
  });
