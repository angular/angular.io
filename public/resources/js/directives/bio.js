angularIO.directive('biocard', function($rootScope, $timeout, $mdDialog) {
  return {
    restrict: 'A',
    scope: {},
    link: function (scope, element, attrs) {
      scope.name = element.attr('data-name');
      scope.bio = element.attr('data-bio');
      scope.pic = element.attr('data-pic');
      scope.twitter = element.attr('data-twitter');
      scope.website =  element.attr('data-website');
      scope.$twitter = scope.twitter !== 'undefined' ? '<a class="button button-subtle button-small" href="https://twitter.com/' +  element.attr('data-twitter') + '" md-button>Twitter</a>' : '';
      scope.$website = scope.website !== 'undefined' ? '<a class="button button-subtle button-small" href="' + element.attr('data-website') + '" md-button>Website</a>' : '';

      element.on('click', function($event) {
        $mdDialog.show({
          parent: angular.element(document.body),
          targetEvent: $event,
          template:
            '<md-dialog class="modal" aria-label="List dialog">' +
            '  <md-content>' +
            '     <img class="left" src="' + scope.pic + '" />' +
            '     <h3 class="text-headline">' + scope.name + '</h3>' +
            '     <div class="modal-social">' + scope.$twitter + scope.$website + '</div>' +
            '     <p class="text-body">' + scope.bio + '</p>' +
            '  </md-content>' +
            '  <div class="md-actions">' +
            '    <md-button ng-click="closeDialog()">' +
            '      Close Bio' +
            '    </md-button>' +
            '  </div>' +
            '</md-dialog>',
          locals: {
            items: scope.items
          },
        controller: DialogController
        });
      });

      function DialogController(scope, $mdDialog, items) {
        scope.items = items;
        scope.closeDialog = function() {
          $mdDialog.hide();
        };
      }
    }
  };
});