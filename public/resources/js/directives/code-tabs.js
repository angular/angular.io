/*
* Code Tabs
*
*/

var getTabName = function(name) {
  var prettyName = name;

  switch(name) {
    case 'es5':         prettyName = 'ES5';         break;
    case 'typescript':  prettyName = 'TypeScript';  break;
    default:            prettyName = name;
  }

  return prettyName;
};

angularIO.directive('code-tabs', function() {
  return {
    template: 'Name: {{customer.name}} Address: {{customer.address}}'
  };


  $scope.language = 'es5';
  var $codeBoxes = $('.code-box');

  if($codeBoxes.length) {
    //UPDATE ALL CODE BOXES
    $codeBoxes.each(function(index, codeBox) {
      //REGISTER ELEMENTS
      var $codeBox = $(codeBox);
      var $examples = $codeBox.find('.prettyprint');
      var $firstItem = $($examples[0]);
      var $header = $("<header class='code-box-header'></header>");
      var $nav = $("<nav class='code-box-nav'></nav>");
      var selectedName = '';

      //HIDE/SHOW CONTENT
      $examples.addClass('is-hidden');
      $firstItem.removeClass('is-hidden');

      //UPDATE NAV FOR EACH CODE BOX
      $examples.each(function(index, example) {
        var $example = $(example);
        var name = $example.data('name');
        var tabName = getTabName(name);
        var selected = (index === 0) ? 'is-selected' : '';
        var $button = $("<button class='button " + selected + "' data-name='" + name + "'>" + tabName + "</button>");

        // ADD EVENTS FOR CODE SNIPPETS
        $button.on('click', function(e) {
          e.preventDefault();
          var $currentButton = $(e.currentTarget);
          var $buttons = $nav.find('.button');
          var selectedName = $currentButton.data('name');
          $buttons.removeClass('is-selected');
          $currentButton.addClass('is-selected');

          //UPDAT VIEW ON SELECTTION
          $examples.addClass('is-hidden');
          var $currentExample = $codeBox.find(".prettyprint[data-name='" + selectedName + "']");
          $currentExample.removeClass('is-hidden').addClass('animated fadeIn');
        });

        $nav.append($button);
      });

      //ADD HEADER TO DOM
      $header.append($nav);
      $codeBox.prepend($header);
    });

    //FADEIN EXAMPLES
    $codeBoxes.addClass('is-visible');
  }

  // TOGGLE CODE LANGUAGE
  $scope.toggleCodeExample = function(event, name) {
    event.preventDefault();
    $scope.language = language;
  };


});

