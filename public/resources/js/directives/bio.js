angularIO.directive('biocard', function($rootScope, $timeout, $mdDialog) {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, element, attrs) {
      // SET SCOPE VALUES
      scope.name = attrs.name;
      scope.pic = attrs.pic;
      scope.bio = attrs.bio;
      scope.twitter = attrs.twitter;
      scope.website = attrs.website;

      // CLOSE MODAL METHOD
      scope.closeDialog = function() {
        $mdDialog.hide();
      };

      // OPEN BIO WHEN CLICKING ON CARD
      element.on('click', function($event) {
        $mdDialog.show({
          parent: angular.element(document.body),
          targetEvent: $event,
          scope: scope.$new(),   // Uses prototypal inheritance to gain access to parent scope
          preserveScope: true,
          template:
            '<md-dialog class="modal" aria-label="List dialog">' +
            '  <md-content>' +
            '     <img class="left" src="{{pic}}" />' +
            '     <h3 class="text-headline">{{name}}</h3>' +
            '     <div class="modal-social">' +
            '       <a ng-show="twitter" class="button button-subtle button-small" href="https://twitter.com/{{twitter}}" md-button>Twitter</a>' +
            '       <a ng-show="website" class="button button-subtle button-small" href="{{website}}" md-button>Website</a>' +
            '     </div>' +
            '     <p class="text-body">{{bio}}</p>' +
            '  </md-content>' +
            '  <div class="md-actions">' +
            '    <md-button ng-click="closeDialog()">' +
            '      Close Bio' +
            '    </md-button>' +
            '  </div>' +
            '</md-dialog>'
        });
      });
    }
  };
});
