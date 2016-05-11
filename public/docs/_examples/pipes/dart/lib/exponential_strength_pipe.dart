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
  num transform(dynamic _value, [List<dynamic> args]) {
    var exponent = args.isEmpty
        ? 1
        : args.first is num
            ? args.first
            : num.parse(args.first.toString(), (_) => 1);
    var value = _value is num ? _value : num.parse(_value.toString(), (_) => 0);
    return math.pow(value, exponent);
  }
}
