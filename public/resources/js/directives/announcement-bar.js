/*eslint no-unused-vars: "angularIO" */

/*
* Announcement Bar Banner Directive
*
* A rotating announcement banners used to display
* important updates and news.
*/

angularIO.directive('announcementBar', ['$interval', function($interval) {
  return {
    restrict: 'E',
    scope: {},
    transclude: true,
    replace: true,
    template:
      '<div class="announcement-bar">' +
        '<div class="announcement-bar-slides" ng-transclude></div>' +
        '<nav class="announcement-bar-nav">'+
          '<button ng-class="{ selected: currentSlide === key }" ng-repeat="(key, slide) in slides" ng-click="changeSlide($event, key)">{{key}}</button>' +
        '</nav>' +
      '</div>',

    link: function(scope, element, attrs) {
      // REGISTER ELEMENTS
      scope.slides = angular.element(element[0].getElementsByClassName('announcement-bar-slide'));
      var slideLenth = scope.slides.length;

      // SHOW FIRST SLIDE
      scope.currentSlide = 0;
      angular.element(scope.slides[0]).addClass('is-visible');


      /*
      * Change Slide Using Nav
      *
      */

      scope.changeSlide = function(event, slideNum) {
        // CANCEL TIMEOUT AND CHANGE SLIDE
        $interval.cancel(scope.timeoutId)
        scope.slides.removeClass('is-visible');
        angular.element(scope.slides[slideNum]).addClass('is-visible');
        scope.currentSlide = slideNum;
      };


      /*
      * Start Slideshow Cyle
      *
      */

      scope.timeoutId = $interval(function() {
        // INCREMENT
        scope.currentSlide = scope.currentSlide + 1;

        // HIDE ALL SLIDES
        scope.slides.removeClass('is-visible');

        // RESET ON LAST SLIDE
        if((scope.currentSlide) > (slideLenth - 1))  {
          scope.currentSlide = 0;
        }

        // SHOW SLIDE
        angular.element(scope.slides[scope.currentSlide]).addClass('is-visible');
      }, 5000);
    }
  };
}]);


