// #docregion all
// #docregion log ... everything else ignored.
/**
 * @description This function logs a string.
 */
function log() {
  console.log('Logging.');
}
// #enddocregion

/**
 * @description  My application
 */
var myApp = {
  // #docregion greet
  /**
   * @description  Display a greeting
   * @param {string} name The name of the person to greet
   */
  greet: function(name) {
    console.log('hello ' + name);
  }
  //   #enddocregion
};