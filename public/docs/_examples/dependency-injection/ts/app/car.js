// #docregion
var Engine = (function () {
    function Engine() {
    }
    return Engine;
})();
var Tires = (function () {
    function Tires() {
    }
    return Tires;
})();
var Car = (function () {
    function Car() {
        this.engine = new Engine();
        this.tires = new Tires();
    }
    // Method using the engine and tires
    Car.prototype.drive = function () { };
    return Car;
})();
// #enddocregion
//# sourceMappingURL=car.js.map