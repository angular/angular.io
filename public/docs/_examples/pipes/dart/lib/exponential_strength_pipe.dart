// #docregion
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
class ExponentialStrengthPipe extends PipeTransform {
  num transform(num value, num exponent) => math.pow(value, exponent);
}
