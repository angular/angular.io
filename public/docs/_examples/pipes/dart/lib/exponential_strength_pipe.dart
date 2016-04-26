import 'dart:math' as math;

import 'package:angular2/angular2.dart';

/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
 */
@Pipe(name: 'exponentialStrength')
@Injectable() // FIXME(chalin): unnecessary?
class ExponentialStrengthPipe extends PipeTransform {
  num transform(num value, String exponent) =>
    math.pow(value,
      num.parse(exponent, onError: (_) => 1));
}
