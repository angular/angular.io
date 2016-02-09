import 'dart:math' as math;

import 'package:angular2/angular2.dart';

/*
* Raise the value exponentially
* Takes a value that defaults to 0 and an exponent argument that defaults to 1.
* Checks for value to be a string or number.
* Usage:
*   value | exponentialStrength:exponent
* Example:
*   {{ 2 |  exponentialStrength:10}}
*   formats to: 1024
*/

@Pipe(name: 'exponentialStrength')
@Injectable()
class ExponentialStrengthPipe extends PipeTransform {
  transform(dynamic value, [List<dynamic> args]) {
    var v = int.parse(value.toString(), onError: (source) => 0);
    var p = args.isEmpty
        ? 1
        : int.parse(args.first.toString(), onError: (source) => 1);
    return math.pow(v, p);
  }
}
