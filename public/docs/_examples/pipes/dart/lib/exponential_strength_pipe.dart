library pipes_examples.exponential_strength_pipe;

import 'package:angular2/angular2.dart';
import 'dart:math';

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
class ExponentialStrengthPipe {
  transform(dynamic value, [List<dynamic> args]) => pow(
      int.parse(value.toString(), onError: (source) => 0),
      args.isEmpty ? 1 : int.parse(args[0].toString(), onError: (source) => 1));
}
