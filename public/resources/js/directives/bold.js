angularIO.directive('bold', function ($timeout) {
  return {
    scope: { bold: '=bold' },
    link:  postLink
  };
  function postLink (scope, element) {
    var bold = typeof scope.bold === 'string'
        ? [ scope.bold ]
        : scope.bold;
    $timeout(function () {
      var html = element.html();
      angular.forEach(bold, function (bold) {
        html = html.replace(new RegExp(bold.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), '<b>$&</b>');
      });
      html = html.replace(/\n/g, '<br>');
      html = html.replace(/ /g, '&nbsp;');
      element.html(html);
    });
  }
});