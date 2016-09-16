/*eslint no-unused-vars: "angularIO" */

/*
* Announcement Bar Banner Directive
*
* A rotating announcement banners used to display
* important updates and news.
*/

angularIO.directive('banner', ['$interval', function($interval) {
  return {
    restrict: 'E',
    transclude: true,
    compile: function(tElement, attrs) {
      var template =
        '<div class="announcement-bar clearfix" ng-transclude></div>';

      // UPDATE ELEMENT WITH NEW TEMPLATE
      tElement.html(template);

      // RETURN ELEMENT
      return function(scope, element, attrs) {
        var slides = angular.element(element[0].getElementsByClassName('announcement-bar-slide'));
        var slideLenth = slides.length;
        var currentSlide = 1;

        // SHOW FIRST SLIDE
        angular.element(slides[0]).addClass('is-visible');


        // START SLIDESHOW CYCLE
        var timeoutId = $interval(function() {

          if((currentSlide + 1) <= slideLenth)  {
            slides.removeClass('is-visible');
            angular.element(slides[currentSlide]).addClass('is-visible');
          }
          else {
            // RESET ON LAST SLIDE
            currentSlide = 0;
            slides.removeClass('is-visible');
            angular.element(slides[currentSlide]).addClass('is-visible');
          }

          // INCREMENT
          currentSlide = currentSlide + 1;
        }, 5000);
      };
    }
  };
}]);
