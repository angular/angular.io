/*
 * Apllication Controller
 *
 */

angularIO.directive('bold', function ($timeout) {
  return {
    scope: { bold: '=bold' },
    link:  postLink
  };
  function postLink (scope, element) {
    var bold = typeof scope.bold === 'string'
        ? [ scope.bold ]
        : scope.bold;
    $timeout(function () {
      var html = element.html();
      angular.forEach(bold, function (bold) {
        html = html.replace(new RegExp(bold.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), '<b>$&</b>');
      });
      html = html.replace(/\n/g, '<br>');
      html = html.replace(/ /g, '&nbsp;');
      element.html(html);
    });
  }
});

angularIO.controller('AppCtrl', [ '$scope', '$mdDialog', '$timeout', '$http', function ($scope, $mdDialog, $timeout, $http) {

  $http.get('/resources/js/app-data.json').then(function(response) {
    $scope.apiList = response.data;
  });

  $scope.showDocsNav = false;
  $scope.showMainNav = false;
  $scope.showMenu    = false;

  // TOGGLE MAIN NAV (TOP) ON MOBILE
  $scope.toggleDocsMenu = function () {
    $scope.showDocsNav = !$scope.showDocsNav;
  };

  // TOGGLE DOCS NAV
  $scope.toggleMainMenu = function () {
    $scope.showMainNav = !$scope.showMainNav;
  };

  // TOGGLE DOCS VERSION & LANGUAGE
  $scope.toggleVersionMenu = function () {
    $scope.showMenu = !$scope.showMenu;
  };

  $scope.setType = function (type) {
    if (type === $scope.apiType) $scope.apiType = '';
    else $scope.apiType = type;
  };

  $scope.apiSections = [
    { name: 'angular2/core', title: 'Core' },
    { name: 'angular2/http', title: 'HTTP' },
    { name: 'angular2/lifecycle_hooks', title: 'Lifecycle Hooks' },
    { name: 'angular2/router', title: 'Router' },
    { name: 'angular2/test', title: 'Test' }
  ];
  $scope.apiType     = '';
  $scope.apiFilter   = '';

  $scope.cheatsheet = [
    {
      "syntax":      "Bootstrapping",
      "description": "import {bootstrap} from 'angular2/angular2';",
      "children":    [
        {
          "syntax":      "<input [value]=\"firstName\">",
          "description": "Binds property value to the result of expression firstName.",
          bold:          '[value]'
        },
        {
          "syntax":      "<div [attr.role]=\"myAriaRole\">",
          "description": "Binds attribute role to the result of expression myAriaRole.",
          bold:          '[attr.role]'
        },
        {
          "syntax":      "<div [class.extra-sparkle]=\"isDelightful\">",
          "description": "Binds the presence of the css class extra-sparkle on the element to the truthiness of the expression isDelightful.",
          bold:          '[class.extra-sparkle]'
        },
        {
          "syntax":      "<div [style.width.px]=\"mySize\">",
          "description": "Binds style property width to the result of expression mySize in pixels. Units are optional.",
          bold:          '[style.width.px]'
        },
        {
          "syntax":      "<button (click)=\"readRainbow($event)\">",
          "description": "Calls method readRainbow when a click event is triggered on this button element (or its children) and passes in the event object.",
          bold:          '(click)'
        },
        {
          "syntax":      "<div title=\"Hello {{ponyName}}\">",
          "description": "Binds a property to an interpolated string, e.g. \"Hello Seabiscuit\". Equivalent to: <div [title]=\"'Hello' + ponyName\">",
          bold:          '{{ponyName}}'
        },
        {
          "syntax":      "<p>Hello {{ponyName}}</p>",
          "description": "Binds text content to an interpolated string, e.g. \"Hello Seabiscuit\".",
          bold:          '{{ponyName}}'
        },
        {
          "syntax":      "<my-cmp [(title)]=\"name\">",
          "description": "Sets up two-way data binding. Equivalent to:\n<my-cmp [title]=\"name\" (title-change)=\"name=$event\">",
          bold:          '[(title)]'
        },
        {
          "syntax":      "<video #movieplayer ...>\n<button (click)=\"movieplayer.play()\" >",
          "description": "Creates a local variable movieplayer that provides access to the video element instance in data- and event-binding expressions in the current template.",
          bold:          [ '#movieplayer', '(click)' ]
        },
        {
          "syntax":      "<p *my-unless=\"myExpression\">...</p>",
          "description": "The * symbol means that the current element will be turned into an embedded template. Equivalent to:\n<template [my-unless]=\"myExpression\"><p>...</p></template>",
          bold:          '*my-unless'
        },
        {
          "syntax":      "<p>Card No.: {{cardNumber | myCreditCardNumberFormatter}}</p>",
          "description": "Transforms the current value of expression cardNumber via pipe called creditCardNumberFormatter.",
          bold:          '{{cardNumber | myCreditCardNumberFormatter}}'
        },
        {
          "syntax":      "<p>Employer: {{employer?.companyName}}</p>",
          "description": "The Elvis operator (?) means that the employer field is optional and if undefined, the rest of the expression should be ignored.",
          bold:          '{{employer?.companyName}}'
        }
      ]
    },
    {
      "syntax":      "Built-in directives",
      "description": "import {NgIf, ...} from 'angular2/angular2';",
      "children":    [
        {
          "syntax":      "<section *ng-if=\"showSection\">",
          "description": "Removes or recreates a portion of the DOM tree based on the showSection expression.",
          bold:          '*ng-if'
        },
        {
          "syntax":      "<li *ng-for=\"#item of list\">",
          "description": "Turns the li element and its contents into a template, and uses that to instantiate a view for each item in list.",
          bold:          '*ng-for'
        },
        {
          "syntax":      "<div [ng-switch]=\"conditionExpression\">\n  <template [ng-switch-when]=\"case1Exp\">...</template>\n  <template ng-switch-when=\"case2LiteralString\">...</template>\n  <template ng-switch-default>...</template>\n</div>",
          "description": "Conditionally swaps the contents of the div by selecting one of the embedded templates based on the current value of conditionExpression.",
          bold:          [ '[ng-switch]', '[ng-switch-when]', 'ng-switch-when', 'ng-switch-default' ]
        },
        {
          "syntax":      "<div [ng-class]=\"{active: isActive, disabled: isDisabled}\">",
          "description": "Binds the presence of css classes on the element to the truthiness of the associated map values. The right-hand side expression should return {class-name: true/false} map.",
          bold:          '[ng-class]'
        }
      ]
    },
    {
      "syntax":      "Forms",
      "description": "import {FORM_DIRECTIVES} from 'angular2/angular2';",
      "children":    [
        {
          "syntax":      "<input [(ng-model)]=\"userName\">",
          "description": "Provides two-way data-binding, parsing and validation for form controls.",
          bold:          '[(ng-model)]'
        }
      ]
    },
    {
      "syntax":      "Class decorators",
      "description": "import {Directive, ...} from 'angular2/angular2';",
      "children":    [
        {
          "syntax":      "@Component({...})\nclass MyComponent() {}",
          "description": "Declares that a class is a component and provides metadata about the component.",
          bold:          '@Component({...})'
        },
        {
          "syntax":      "@Pipe({...})\nclass MyPipe() {}",
          "description": "Declares that a class is a pipe and provides metadata about the pipe.",
          bold:          '@Pipe({...})'
        },
        {
          "syntax":      "@Injectable()\nclass MyService() {}",
          "description": "Declares that a class has dependencies that should be injected into the constructor when the dependency injector is creating an instance of this class.",
          bold:          '@Injectable()'
        } ]
    },
    {
      "syntax": "@Directive configuration (used as @Directive({ property1: value1, ... }) )",
      children: [
        {
          "syntax":      "selector: '.cool-button:not(a)'",
          "description": "Specifies a css selector that identifies this directive within a template. Supported selectors include: element, [attribute], .class, and :not().\nDoes not support parent-child relationship selectors.",
          bold:          'selector:'
        },
        {
          "syntax":      "providers: [MyService, provide(...)]",
          "description": "Array of dependency injection providers for this directive and its children.",
          bold:          'providers:'
        } ]
    },
    {
      "syntax": "@Component configuration (@Component extends @Directive, so the @Directive configuration above applies to components as well)",
      children: [
        {
          "syntax":      "viewProviders: [MyService, provide(...)]",
          "description": "Array of dependency injection providers scoped to this component's view.",
          bold:          'viewProviders:'
        },
        {
          "syntax":      "template: 'Hello {{name}}'\ntemplateUrl: 'my-component.html'",
          "description": "Inline template / external template url of the component's view.",
          bold:          [ 'template:', 'templateUrl:' ]
        },
        {
          "syntax":      "styles: ['.primary {color: red}']\nstyleUrls: ['my-component.css']",
          "description": "List of inline css styles / external stylesheet urls for styling component’s view.",
          bold:          [ 'styles:', 'styleUrls:' ]
        },
        {
          "syntax":      "directives: [MyDirective, MyComponent]",
          "description": "List of directives used in the the component’s template.",
          bold:          'directives:'
        },
        {
          "syntax":      "pipes: [MyPipe, OtherPipe]",
          "description": "List of pipes used in the component's template.",
          bold:          'pipes:'
        } ]
    },
    {
      "syntax":      "Class field decorators for directives and components",
      "description": "import {Input, ...} from 'angular2/angular2';",
      children:      [
        {
          "syntax":      "@Input() myProperty;",
          "description": "Declares an input property that we can update via property binding, e.g.\n<my-cmp [my-property]=\"someExpression\">",
          bold:          '@Input()'
        },
        {
          "syntax":      "@Output() myEvent = new EventEmitter();",
          "description": "Declares an output property that fires events to which we can subscribe with an event binding, e.g. <my-cmp (my-event)=\"doSomething()\">",
          bold:          '@Output()'
        },
        {
          "syntax":      "@HostBinding('[class.valid]') isValid;",
          "description": "Binds a host element property (e.g. css class valid) to directive/component property (e.g. isValid)",
          bold:          '@HostBinding(\'[class.valid]\')'
        },
        {
          "syntax":      "@HostListener('click', ['$event']) onClick(e) {...}",
          "description": "Subscribes to a host element event (e.g. click) with a directive/component method (e.g., onClick), optionally passing an argument ($event)",
          bold:          "@HostListener('click', ['$event'])"
        },
        {
          "syntax":      "@ContentChild(myPredicate) myChildComponent;",
          "description": "Binds the first result of the component content query (myPredicate) to the myChildComponent property of the class.",
          bold:          '@ContentChild(myPredicate)'
        },
        {
          "syntax":      "@ContentChildren(myPredicate) myChildComponents;",
          "description": "Binds the results of the component content query (myPredicate) to the myChildComponents property of the class.",
          "bold":        "@ContentChildren(myPredicate)"
        },
        {
          "syntax":      "@ViewChild(myPredicate) myChildComponent;",
          "description": "Binds the first result of the component view query (myPredicate) to the myChildComponent property of the class. Not available for directives.",
          "bold":        "@ViewChild(myPredicate)"
        },
        {
          "syntax":      "@ViewChildren(myPredicate) myChildComponents;",
          "description": "Binds the results of the component view query (myPredicate) to the myChildComponents property of the class. Not available for directives.",
          "bold":        "@ViewChildren(myPredicate)"
        } ]
    },
    {
      "syntax": "Directive and component change detection and lifecycle hooks (implemented as class methods)",
      children: [
        {
          "syntax":      "constructor(myService: MyService, ...) { ... }",
          "description": "The class constructor is called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.",
          "bold":        "constructor(myService: MyService, ...)",
        },
        {
          "syntax":      "onChanges(changeRecord) { ... }",
          "description": "Called after every change to input properties and before processing content or child views.",
          bold:          'onChanges(changeRecord)'
        },
        {
          "syntax":      "onInit() { ... }",
          "description": "Called after the constructor, initializing input properties, and the first call to onChanges.",
          bold:          'onInit()'
        },
        {
          "syntax":      "doCheck() { ... }",
          "description": "Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.",
          bold:          'doCheck()'
        },
        {
          "syntax":      "afterContentInit() { ... }",
          "description": "Called after onInit when the component's or directive's content has been initialized.",
          bold:          'afterContentInit()'
        },
        {
          "syntax":      "afterContentChecked() { ... }",
          "description": "Called after every check of the component's or directive's content.",
          bold:          'afterContentChecked()'
        },
        {
          "syntax":      "afterViewInit() { ... }",
          "description": "Called after onContentInit when the component's view has been initialized. Applies to components only.",
          bold:          'afterViewInit()'
        },
        {
          "syntax":      "afterViewChecked() { ... }",
          "description": "Called after every check of the component's view. Applies to components only.",
          bold:          'afterViewChecked()'
        },
        {
          "syntax":      "onDestroy() { ... }",
          "description": "Called once, before the instance is destroyed.",
          bold:          'onDestroy()'
        } ]
    },
    {
      "syntax":      "Dependency injection configuration",
      "description": "import {provide} from 'angular2/angular2';",
      children:      [
        {
          "syntax":      "provide(MyService, {useClass: MyMockService})",
          "description": "Sets or overrides the provider for MyService to the MyMockService class.",
          "bold":        [ 'provide', 'useClass' ]
        },
        {
          "syntax":      "provide(MyService, {useFactory: myFactory})",
          "description": "Sets or overrides the provider for MyService to the myFactory factory function.",
          bold:          [ 'provide', 'useFactory' ]
        },
        {
          "syntax":      "provide(MyValue, {useValue: 41})",
          "description": "Sets or overrides the provider for MyValue to the value 41.",
          bold:          [ 'provide', 'useValue' ]
        } ]
    },
    {
      "syntax":      "Routing and navigation",
      "description": "import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, ...} from 'angular2/router';",
      children:      [
        {
          "syntax":      "@RouteConfig([\n  { path: '/:myParam', component: MyComponent, as: 'MyCmp' },\n  { path: '/staticPath', component: ..., as: ...},\n  { path: '/*wildCardParam', component: ..., as: ...}\n])\nclass MyComponent() {}",
          "description": "Configures routes for the decorated component. Supports static, parameterized and wildcard routes.",
          bold:          '@RouteConfig'
        },
        {
          "syntax":      "<router-outlet></router-outlet>",
          "description": "Marks the location to load the component of the active route.",
          "bold":        "router-outlet"
        },
        {
          "syntax":      "<a [router-link]=\"[ '/MyCmp', {myParam: 'value' } ]\">",
          "description": "Creates a link to a different view based on a route instruction consisting of a route name and optional parameters. The route name matches the as property of a configured route. Add the '/' prefix to navigate to a root route; add the './' prefix for a child route.",
          bold:          '[router-link]'
        },
        {
          "syntax":      "@CanActivate(() => { ... })class MyComponent() {}",
          "description": "A component decorator defining a function that the router should call first to determine if it should activate this component. Should return a boolean or a promise.",
          bold:          '@CanActivate'
        },
        {
          "syntax":      "onActivate(nextInstruction, prevInstruction) { ... }",
          "description": "After navigating to a component, the router calls component's onActivate method (if defined).",
          bold:          'onActivate'
        },
        {
          "syntax":      "canReuse(nextInstruction, prevInstruction) { ... }",
          "description": "The router calls a component's canReuse method (if defined) to determine whether to reuse the instance or destroy it and create a new instance. Should return a boolean or a promise.",
          bold:          'canReuse'
        },
        {
          "syntax":      "onReuse(nextInstruction, prevInstruction) { ... }",
          "description": "The router calls the component's onReuse method (if defined) when it re-uses a component instance.",
          bold:          'onReuse'
        },
        {
          "syntax":      "canDeactivate(nextInstruction, prevInstruction) { ... }",
          "description": "The router calls the canDeactivate methods (if defined) of every component that would be removed after a navigation. The navigation proceeds if and only if all such methods return true or a promise that is resolved.",
          bold:          'canDeactivate'
        },
        {
          "syntax":      "onDeactivate(nextInstruction, prevInstruction) { ... }",
          "description": "Called before the directive is removed as the result of a route change. May return a promise that pauses removing the directive until the promise resolves.",
          bold:          'onDeactivate'
        } ]
    }
  ];

  /*
   * Prettify Code
   *
   * Finish Rendereding code directives then prettify code
   */

  // GRAB ALL TAGS NOT USING DIRECTIVES
  var preTags = angular.element(document.body).find('pre');

  // LOOP THROUGH AND ADD PRETTIFY CLASS
  _.each(preTags, function (element) {
    var preTag = angular.element(element);

    // IF NOT FORMATTED, ADD PRETTY PRINT
    if (!preTag.hasClass('prettyprint')) {
      preTag.addClass('prettyprint linenums');
    }
  });

  // TRIGGER PRETTYPRINT AFTER DIGEST LOOP COMPLETE
  $timeout(prettyPrint, 1);
} ]);