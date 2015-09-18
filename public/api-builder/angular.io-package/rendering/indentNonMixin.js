module.exports = function(encodeCodeBlock) {
  var MIXIN_PATTERN = /\S*\+\S*\(.*/;
  return {
    name: 'indentNonMixin',
    process: function (str, width, indentfirst) {
      str = normalize(str, '');

      if (str === '') return '';

      width = width || 4;
      var res = '';
      var lines = str.split('\n');
      var sp = repeat(' ', width);
      var spMixin = repeat(' ', width - 2);

      for (var i = 0; i < lines.length; i++) {
        if (i === 0 && !indentfirst) {
          res += lines[i] + '\n';
        }
        else {
          // indent lines that match mixin pattern by 2 less.
          if (lines[i].indexOf('{@example') != -1) {
            res += spMixin + lines[i] + '\n';
          } else {
            res += sp + lines[i] + '\n';
          }
        }
      }

      return res;
    }
  };

  function normalize(value, defaultValue) {
    if(value === null || value === undefined || value === false) {
      return defaultValue;
    }
    return value;
  }

  function repeat(char_, n) {
    var str = '';
    for(var i=0; i<n; i++) {
      str += char_;
    }
    return str;
  };

};