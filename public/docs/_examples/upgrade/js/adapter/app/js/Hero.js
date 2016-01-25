(function() {
  'use strict';

  function Hero(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  app.Hero = Hero;
  
})(window.app || (window.app = {}));
