'use strict';

module.exports = function logFactory() {
  var winston = require('winston');
  winston.cli();
  winston.level = 'info';
  return winston;
};