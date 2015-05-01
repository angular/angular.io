/*
* Code Formatting
*
*/


angularIO.directive('pre', function() {
  return {
    template: 'Name: {{customer.name}} Address: {{customer.address}}'
  };


  if($codeBlocks.length) {
    $codeBlocks.each(function(index, codeEl) {
      var $codeEl = $(codeEl);

      if(!$codeEl.hasClass('prettyprint')) {
        $codeEl.addClass('prettyprint linenums');
      }
    });
  }

});