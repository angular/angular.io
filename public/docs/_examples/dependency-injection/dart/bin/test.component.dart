// Simulate a simple test

// Reader should look to the testing chapter for the real thing
import "package:angular2/core.dart";
import "heroes/hero.service.dart";
import "heroes/hero-list.component.dart";

@Component(
    selector: "my-tests",
    template: '''
    <h2>Tests</h2>
    <p id="tests">Tests {{results.pass}}: {{results.message}}</p>
  ''')
class TestComponent {
  var results = runTests();
}

/////////////////////////////////////
runTests() {
  //#docregion spec
  var expectedHeroes = [
    {"name": "A"},
    {"name": "B"}
  ];
  var mockService = ({"getHeroes": () => expectedHeroes} as HeroService);
  it("should have heroes when HeroListComponent created", () {
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
expect(dynamic actual) {
  return {
    "toEqual": (dynamic expected) {
      testResults = identical(actual, expected)
          ? {"pass": "passed", "message": '''${ testName}'''}
          : {
              "pass": "failed",
              "message":
                  '''${ testName}; expected ${ actual} to equal ${ expected}.'''
            };
    }
  };
}

it(String label, dynamic /* () => void */ test) {
  testName = label;
  test();
}
