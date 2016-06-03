// Simulate a simple test
// Reader should look to the testing chapter for the real thing

import 'package:angular2/core.dart';

import 'heroes/hero.dart';
import 'heroes/hero_list_component.dart';
import 'heroes/hero_service.dart';

@Component(
    selector: 'my-tests',
    template: '''
      <h2>Tests</h2>
      <p id="tests">Tests {{results['pass']}}: {{results['message']}}</p>
    ''')
class TestComponent {
  var results = runTests();
}

class MockHeroService implements HeroService {
  final List<Hero> _heroes;
  MockHeroService(this._heroes);

  @override
  List<Hero> getHeroes() => _heroes;
}

/////////////////////////////////////
dynamic runTests() {
  //#docregion spec
  var expectedHeroes = [new Hero(0, 'A'), new Hero(1, 'B')];
  var mockService = new MockHeroService(expectedHeroes);
  it('should have heroes when HeroListComponent created', () {
    var hlc = new HeroListComponent(mockService);
    expect(hlc.heroes.length).toEqual(expectedHeroes.length);
  });
  //#enddocregion spec
  return testResults;
}
//////////////////////////////////

// Fake Jasmine infrastructure
String testName;
dynamic testResults;
dynamic expect(dynamic actual) => new ExpectResult(actual);

class ExpectResult {
  final actual;
  ExpectResult(this.actual);

  void toEqual(dynamic expected) {
    testResults = actual == expected
        ? {'pass': 'passed', 'message': testName}
        : {
            'pass': 'failed',
            'message': '$testName; expected $actual to equal $expected.'
          };
  }
}

void it(String label, void test()) {
  testName = label;
  test();
}

