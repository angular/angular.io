// #docregion
import 'package:angular2/core.dart';

import 'car.dart';
import 'car_creations.dart' as carCreations;
import 'car_factory.dart';
import 'car_injector.dart';
import 'car_no_di.dart' as carNoDi;

@Component(
    selector: 'my-car',
    template: '''
      <h2>Cars</h2>
      <div id="di">{{car.drive()}}</div>
      <div id="nodi">{{noDiCar.drive()}}</div>
      <div id="injector">{{injectorCar.drive()}}</div>
      <div id="factory">{{factoryCar.drive()}}</div>
      <div id="simple">{{simpleCar.drive()}}</div>
      <div id="super">{{superCar.drive()}}</div>
      <div id="test">{{testCar.drive()}}</div>''',
    providers: const [Car, Engine, Tires])
class CarComponent {
  final Car car;

  CarComponent(this.car);

  Car factoryCar = (new CarFactory()).createCar();
  Car injectorCar = useInjector();
  carNoDi.Car noDiCar = new carNoDi.Car();
  Car simpleCar = carCreations.simpleCar();
  Car superCar = carCreations.superCar();
  Car testCar = carCreations.testCar();
}
