// #docregion
import "package:angular2/core.dart";
import "car.dart";
import "car_no_di.dart" as carNoDi;
import "car_factory.dart";
import "car_creations.dart" as carCreations;
import "car_injector.dart";

@Component(
    selector: "my-car",
    template: '''
  <h2>Cars</h2>
  <div id="di">{{car.drive()}}</div>
  <div id="nodi">{{noDiCar.drive()}}</div>
  <div id="injector">{{injectorCar.drive()}}</div>
  <div id="factory">{{factoryCar.drive()}}</div>
  <div id="simple">{{simpleCar.drive()}}</div>
  <div id="super">{{superCar.drive()}}</div>
  <div id="test">{{testCar.drive()}}</div>
  ''',
    providers: const [Car, Engine, Tires])
class CarComponent {
  Car car;

  CarComponent(this.car) {}
  var factoryCar = (new CarFactory()).createCar();
  var injectorCar = useInjector();
  var noDiCar = new carNoDi.Car();
  var simpleCar = carCreations.simpleCar();
  var superCar = carCreations.superCar();
  var testCar = carCreations.testCar();
}
