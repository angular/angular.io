angularIO.directive('bio', function($rootScope, $timeout) {
  return {
    restrict: 'A',
    replace: true,
    scope: {},
    link: function (scope, element, attrs) {
      var name = element.attr('data-name');
      var bio = element.attr('data-bio');
      var pic = element.attr('data-pic');
      var twitter = element.attr('data-twitter');
      var website =  element.attr('data-website');
      var $twitter = twitter !== 'undefined' ? '<a class="button button-subtle button-small" href="https://twitter.com/' +  element.attr('data-twitter') + '" md-button>Twitter</a>' : '';
      var $website = website !== 'undefined' ? '<a class="button button-subtle button-small" href="' + element.attr('data-website') + '" md-button>Website</a>' : '';

      scope.showBio = function(event) {
        $mdDialog.show({
          parent: angular.element(document.body),
          targetEvent: $event,
          template:
            '<md-dialog class="modal" aria-label="List dialog">' +
            '  <md-content>' +
            '     <img class="left" src="' + pic + '" />' +
            '     <h3 class="text-headline">' + name + '</h3>' +
            '     <div class="modal-social">' + $twitter + $website + '</div>' +
            '     <p class="text-body">' + bio + '</p>' +
            '  </md-content>' +
            '  <div class="md-actions">' +
            '    <md-button ng-click="closeDialog()">' +
            '      Close Bio' +
            '    </md-button>' +
            '  </div>' +
            '</md-dialog>',
          locals: {
            items: $scope.items
          },
        controller: DialogController
        });
      };

      function DialogController(scope, $mdDialog, items) {
        scope.items = items;
        scope.closeDialog = function() {
          $mdDialog.hide();
        };
      }
    }
  };
});