/*
 * Apllication Controller
 *
 */

angularIO.controller('AppCtrl', [ '$scope', '$mdDialog', '$timeout', function ($scope, $mdDialog, $timeout) {
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
    { name: 'core', title: 'Core' },
    { name: 'http', title: 'HTTP' },
    { name: 'lifecycle_hooks', title: 'Lifecycle Hooks' },
    { name: 'router', title: 'Router' },
    { name: 'test', title: 'Test' }
  ];
  $scope.apiType     = '';
  $scope.apiFilter   = '';

  $scope.apiList                 = {};
  $scope.apiList.core            = [
    {
      "title":          "APP_COMPONENT",
      "varType":        "OpaqueToken",
      "originalModule": "angular2/src/core/application_tokens",
      "docType":        "const"
    },
    {
      "title":          "APP_ID",
      "varType":        "OpaqueToken",
      "originalModule": "angular2/src/core/render/dom/dom_tokens",
      "docType":        "const"
    },
    {
      "title":          "AbstractBindingError",
      "originalModule": "angular2/src/core/di/exceptions",
      "docType":        "class"
    },
    {
      "title":          "AbstractControl",
      "originalModule": "angular2/src/core/forms/model",
      "docType":        "class"
    },
    {
      "title":          "AbstractControlDirective",
      "originalModule": "angular2/src/core/forms/directives/abstract_control_directive",
      "docType":        "class"
    },
    {
      "title":          "AbstractProviderError",
      "originalModule": "angular2/src/core/di/exceptions",
      "docType":        "class"
    },
    {
      "title":          "AfterContentChecked",
      "originalModule": "angular2/src/core/compiler/interfaces",
      "docType":        "interface"
    },
    {
      "title":          "AfterContentInit",
      "originalModule": "angular2/src/core/compiler/interfaces",
      "docType":        "interface"
    },
    {
      "title":          "AfterViewChecked",
      "originalModule": "angular2/src/core/compiler/interfaces",
      "docType":        "interface"
    },
    {
      "title":          "AfterViewInit",
      "originalModule": "angular2/src/core/compiler/interfaces",
      "docType":        "interface"
    },
    {
      "title":          "AppRootUrl",
      "originalModule": "angular2/src/core/services/app_root_url",
      "docType":        "class"
    },
    {
      "title":          "AppViewManager",
      "originalModule": "angular2/src/core/compiler/view_manager",
      "docType":        "interface"
    },
    {
      "title":          "ApplicationRef",
      "originalModule": "angular2/src/core/application_ref",
      "docType":        "interface"
    },
    {
      "title":          "AsyncPipe",
      "originalModule": "angular2/src/core/pipes/async_pipe",
      "docType":        "class"
    },
    {
      "title":          "Attribute",
      "varType":        "AttributeFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "var"
    },
    {
      "title":          "AttributeFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "interface"
    },
    {
      "title":          "AttributeMetadata",
      "originalModule": "angular2/src/core/metadata/di",
      "docType":        "class"
    },
    {
      "title":          "Binding",
      "originalModule": "angular2/src/core/di/binding",
      "docType":        "class"
    },
    {
      "title":          "BindingBuilder",
      "originalModule": "angular2/src/core/di/binding",
      "docType":        "class"
    },
    {
      "title":          "By",
      "originalModule": "angular2/src/core/debug/debug_element",
      "docType":        "class"
    },
    {
      "title":          "CORE_DIRECTIVES",
      "originalModule": "angular2/src/core/directives",
      "docType":        "const"
    },
    {
      "title":          "ChangeDetectionError",
      "originalModule": "angular2/src/core/change_detection/exceptions",
      "docType":        "class"
    },
    {
      "title":          "ChangeDetectionStrategy",
      "originalModule": "angular2/src/core/change_detection/constants",
      "docType":        "enum"
    },
    {
      "title":          "ChangeDetectorRef",
      "originalModule": "angular2/src/core/change_detection/change_detector_ref",
      "docType":        "interface"
    },
    {
      "title":          "CheckboxControlValueAccessor",
      "originalModule": "angular2/src/core/forms/directives/checkbox_value_accessor",
      "docType":        "directive"
    },
    {
      "title":          "Class",
      "originalModule": "angular2/src/core/util/decorators",
      "docType":        "function"
    },
    {
      "title":          "ClassDefinition",
      "originalModule": "angular2/src/core/util/decorators",
      "docType":        "interface"
    },
    {
      "title":          "Compiler",
      "originalModule": "angular2/src/core/compiler/compiler",
      "docType":        "interface"
    },
    {
      "title":          "Component",
      "varType":        "ComponentFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "var"
    },
    {
      "title":          "ComponentDecorator",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "interface"
    },
    {
      "title":          "ComponentFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "interface"
    },
    {
      "title":          "ComponentMetadata",
      "originalModule": "angular2/src/core/metadata/directives",
      "docType":        "class"
    },
    {
      "title":          "ComponentRef",
      "originalModule": "angular2/src/core/compiler/dynamic_component_loader",
      "docType":        "interface"
    },
    {
      "title":          "ContentChild",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "var"
    },
    {
      "title":          "ContentChildFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "interface"
    },
    {
      "title":          "ContentChildMetadata",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "class"
    },
    {
      "title":          "ContentChildren",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "var"
    },
    {
      "title":          "ContentChildrenFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "interface"
    },
    {
      "title":          "ContentChildrenMetadata",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "class"
    },
    {
      "title":          "Control",
      "originalModule": "angular2/src/core/forms/model",
      "docType":        "class"
    },
    {
      "title":          "ControlArray",
      "originalModule": "angular2/src/core/forms/model",
      "docType":        "class"
    },
    {
      "title":          "ControlContainer",
      "originalModule": "angular2/src/core/forms/directives/control_container",
      "docType":        "class"
    },
    {
      "title":          "ControlGroup",
      "originalModule": "angular2/src/core/forms/model",
      "docType":        "class"
    },
    {
      "title":          "ControlValueAccessor",
      "originalModule": "angular2/src/core/forms/directives/control_value_accessor",
      "docType":        "interface"
    },
    {
      "title":          "CurrencyPipe",
      "originalModule": "angular2/src/core/pipes/number_pipe",
      "docType":        "class"
    },
    {
      "title":          "CyclicDependencyError",
      "originalModule": "angular2/src/core/di/exceptions",
      "docType":        "class"
    },
    {
      "title":          "DEFAULT_PIPES",
      "varType":        "Binding",
      "originalModule": "angular2/src/core/pipes/default_pipes",
      "docType":        "const"
    },
    {
      "title":          "DEFAULT_PIPES_TOKEN",
      "varType":        "OpaqueToken",
      "originalModule": "angular2/src/core/pipes/default_pipes",
      "docType":        "const"
    },
    {
      "title":          "DOCUMENT",
      "varType":        "OpaqueToken",
      "originalModule": "angular2/src/core/render/dom/dom_tokens",
      "docType":        "const"
    },
    {
      "title":          "DatePipe",
      "originalModule": "angular2/src/core/pipes/date_pipe",
      "docType":        "class"
    },
    {
      "title":          "DebugElement",
      "originalModule": "angular2/src/core/debug/debug_element",
      "docType":        "interface"
    },
    {
      "title":          "DecimalPipe",
      "originalModule": "angular2/src/core/pipes/number_pipe",
      "docType":        "class"
    },
    {
      "title":          "DefaultValidators",
      "originalModule": "angular2/src/core/forms/directives/validators",
      "docType":        "class"
    },
    {
      "title":          "DefaultValueAccessor",
      "originalModule": "angular2/src/core/forms/directives/default_value_accessor",
      "docType":        "directive"
    },
    {
      "title":          "Dependency",
      "originalModule": "angular2/src/core/di/binding",
      "docType":        "class"
    },
    {
      "title":          "DependencyMetadata",
      "originalModule": "angular2/src/core/di/metadata",
      "docType":        "class"
    },
    {
      "title":          "Directive",
      "varType":        "DirectiveFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "var"
    },
    {
      "title":          "DirectiveDecorator",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "interface"
    },
    {
      "title":          "DirectiveFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "interface"
    },
    {
      "title":          "DirectiveMetadata",
      "originalModule": "angular2/src/core/metadata/directives",
      "docType":        "class"
    },
    {
      "title":          "DirectiveResolver",
      "originalModule": "angular2/src/core/compiler/directive_resolver",
      "docType":        "class"
    },
    {
      "title":          "DoCheck",
      "originalModule": "angular2/src/core/compiler/interfaces",
      "docType":        "interface"
    },
    {
      "title":          "DynamicComponentLoader",
      "originalModule": "angular2/src/core/compiler/dynamic_component_loader",
      "docType":        "class"
    },
    {
      "title":          "ELEMENT_PROBE_BINDINGS",
      "originalModule": "angular2/src/core/debug/debug_element_view_listener",
      "docType":        "const"
    },
    {
      "title":          "ELEMENT_PROBE_PROVIDERS",
      "originalModule": "angular2/src/core/debug/debug_element_view_listener",
      "docType":        "const"
    },
    {
      "title":          "ElementRef",
      "originalModule": "angular2/src/core/compiler/element_ref",
      "docType":        "class"
    },
    {
      "title":          "EventEmitter",
      "originalModule": "angular2/src/core/facade/async",
      "docType":        "class"
    },
    {
      "title":          "ExpressionChangedAfterItHasBeenCheckedException",
      "originalModule": "angular2/src/core/change_detection/exceptions",
      "docType":        "class"
    },
    {
      "title":          "FORM_BINDINGS",
      "originalModule": "angular2/src/core/forms",
      "docType":        "const"
    },
    {
      "title":          "FORM_DIRECTIVES",
      "originalModule": "angular2/src/core/forms/directives",
      "docType":        "const"
    },
    {
      "title":          "FORM_PROVIDERS",
      "originalModule": "angular2/src/core/forms",
      "docType":        "const"
    },
    {
      "title":          "Form",
      "originalModule": "angular2/src/core/forms/directives/form_interface",
      "docType":        "interface"
    },
    {
      "title":          "FormBuilder",
      "originalModule": "angular2/src/core/forms/form_builder",
      "docType":        "class"
    },
    {
      "title":          "ForwardRefFn",
      "originalModule": "angular2/src/core/di/forward_ref",
      "docType":        "interface"
    },
    {
      "title":          "Host",
      "varType":        "HostFactory",
      "originalModule": "angular2/src/core/di/decorators",
      "docType":        "var"
    },
    {
      "title":          "HostBinding",
      "varType":        "HostBindingFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "var"
    },
    {
      "title":          "HostBindingFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "interface"
    },
    {
      "title":          "HostBindingMetadata",
      "originalModule": "angular2/src/core/metadata/directives",
      "docType":        "class"
    },
    {
      "title":          "HostFactory",
      "originalModule": "angular2/src/core/di/decorators",
      "docType":        "interface"
    },
    {
      "title":          "HostListener",
      "varType":        "HostListenerFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "var"
    },
    {
      "title":          "HostListenerFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "interface"
    },
    {
      "title":          "HostListenerMetadata",
      "originalModule": "angular2/src/core/metadata/directives",
      "docType":        "class"
    },
    {
      "title":          "HostMetadata",
      "originalModule": "angular2/src/core/di/metadata",
      "docType":        "class"
    },
    {
      "title":          "HostViewRef",
      "originalModule": "angular2/src/core/compiler/view_ref",
      "docType":        "interface"
    },
    {
      "title":          "Inject",
      "varType":        "InjectFactory",
      "originalModule": "angular2/src/core/di/decorators",
      "docType":        "var"
    },
    {
      "title":          "InjectFactory",
      "originalModule": "angular2/src/core/di/decorators",
      "docType":        "interface"
    },
    {
      "title":          "InjectMetadata",
      "originalModule": "angular2/src/core/di/metadata",
      "docType":        "class"
    },
    {
      "title":          "Injectable",
      "varType":        "InjectableFactory",
      "originalModule": "angular2/src/core/di/decorators",
      "docType":        "var"
    },
    {
      "title":          "InjectableFactory",
      "originalModule": "angular2/src/core/di/decorators",
      "docType":        "interface"
    },
    {
      "title":          "InjectableMetadata",
      "originalModule": "angular2/src/core/di/metadata",
      "docType":        "class"
    },
    {
      "title":          "Injector",
      "originalModule": "angular2/src/core/di/injector",
      "docType":        "class"
    },
    {
      "title":          "Input",
      "varType":        "InputFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "var"
    },
    {
      "title":          "InputFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "interface"
    },
    {
      "title":          "InputMetadata",
      "originalModule": "angular2/src/core/metadata/directives",
      "docType":        "class"
    },
    {
      "title":          "InstantiationError",
      "originalModule": "angular2/src/core/di/exceptions",
      "docType":        "class"
    },
    {
      "title":          "InvalidBindingError",
      "originalModule": "angular2/src/core/di/exceptions",
      "docType":        "class"
    },
    {
      "title":          "InvalidProviderError",
      "originalModule": "angular2/src/core/di/exceptions",
      "docType":        "class"
    },
    {
      "title":          "IterableDiffer",
      "originalModule": "angular2/src/core/change_detection/differs/iterable_differs",
      "docType":        "interface"
    },
    {
      "title":          "IterableDifferFactory",
      "originalModule": "angular2/src/core/change_detection/differs/iterable_differs",
      "docType":        "interface"
    },
    {
      "title":          "IterableDiffers",
      "originalModule": "angular2/src/core/change_detection/differs/iterable_differs",
      "docType":        "class"
    },
    {
      "title":          "JsonPipe",
      "originalModule": "angular2/src/core/pipes/json_pipe",
      "docType":        "class"
    },
    {
      "title":          "Key",
      "originalModule": "angular2/src/core/di/key",
      "docType":        "class"
    },
    {
      "title":          "KeyValueDiffer",
      "originalModule": "angular2/src/core/change_detection/differs/keyvalue_differs",
      "docType":        "interface"
    },
    {
      "title":          "KeyValueDifferFactory",
      "originalModule": "angular2/src/core/change_detection/differs/keyvalue_differs",
      "docType":        "interface"
    },
    {
      "title":          "KeyValueDiffers",
      "originalModule": "angular2/src/core/change_detection/differs/keyvalue_differs",
      "docType":        "class"
    },
    {
      "title":          "LifeCycle",
      "originalModule": "angular2/src/core/life_cycle/life_cycle",
      "docType":        "class"
    },
    {
      "title":          "LowerCasePipe",
      "originalModule": "angular2/src/core/pipes/lowercase_pipe",
      "docType":        "class"
    },
    {
      "title":          "MaxLengthValidator",
      "originalModule": "angular2/src/core/forms/directives/validators",
      "docType":        "class"
    },
    {
      "title":          "MinLengthValidator",
      "originalModule": "angular2/src/core/forms/directives/validators",
      "docType":        "class"
    },
    {
      "title":          "NG_VALIDATORS",
      "varType":        "OpaqueToken",
      "originalModule": "angular2/src/core/forms/validators",
      "docType":        "const"
    },
    {
      "title":          "NgClass",
      "originalModule": "angular2/src/core/directives/ng_class",
      "docType":        "directive"
    },
    {
      "title":          "NgControl",
      "originalModule": "angular2/src/core/forms/directives/ng_control",
      "docType":        "class"
    },
    {
      "title":          "NgControlGroup",
      "originalModule": "angular2/src/core/forms/directives/ng_control_group",
      "docType":        "directive"
    },
    {
      "title":          "NgControlName",
      "originalModule": "angular2/src/core/forms/directives/ng_control_name",
      "docType":        "directive"
    },
    {
      "title":          "NgFor",
      "originalModule": "angular2/src/core/directives/ng_for",
      "docType":        "directive"
    },
    {
      "title":          "NgForm",
      "originalModule": "angular2/src/core/forms/directives/ng_form",
      "docType":        "directive"
    },
    {
      "title":          "NgFormControl",
      "originalModule": "angular2/src/core/forms/directives/ng_form_control",
      "docType":        "directive"
    },
    {
      "title":          "NgFormModel",
      "originalModule": "angular2/src/core/forms/directives/ng_form_model",
      "docType":        "directive"
    },
    {
      "title":          "NgIf",
      "originalModule": "angular2/src/core/directives/ng_if",
      "docType":        "directive"
    },
    {
      "title":          "NgModel",
      "originalModule": "angular2/src/core/forms/directives/ng_model",
      "docType":        "directive"
    },
    {
      "title":          "NgSelectOption",
      "originalModule": "angular2/src/core/forms/directives/select_control_value_accessor",
      "docType":        "directive"
    },
    {
      "title":          "NgStyle",
      "originalModule": "angular2/src/core/directives/ng_style",
      "docType":        "directive"
    },
    {
      "title":          "NgSwitch",
      "originalModule": "angular2/src/core/directives/ng_switch",
      "docType":        "directive"
    },
    {
      "title":          "NgSwitchDefault",
      "originalModule": "angular2/src/core/directives/ng_switch",
      "docType":        "directive"
    },
    {
      "title":          "NgSwitchWhen",
      "originalModule": "angular2/src/core/directives/ng_switch",
      "docType":        "directive"
    },
    {
      "title":          "NgZone",
      "originalModule": "angular2/src/core/zone/ng_zone",
      "docType":        "class"
    },
    {
      "title":          "NoAnnotationError",
      "originalModule": "angular2/src/core/di/exceptions",
      "docType":        "class"
    },
    {
      "title":          "NoBindingError",
      "originalModule": "angular2/src/core/di/exceptions",
      "docType":        "class"
    },
    {
      "title":          "NoProviderError",
      "originalModule": "angular2/src/core/di/exceptions",
      "docType":        "class"
    },
    {
      "title":          "NumberPipe",
      "originalModule": "angular2/src/core/pipes/number_pipe",
      "docType":        "class"
    },
    {
      "title":          "Observable",
      "originalModule": "angular2/src/core/facade/async",
      "docType":        "class"
    },
    {
      "title":          "OnChanges",
      "originalModule": "angular2/src/core/compiler/interfaces",
      "docType":        "interface"
    },
    {
      "title":          "OnDestroy",
      "originalModule": "angular2/src/core/compiler/interfaces",
      "docType":        "interface"
    },
    {
      "title":          "OnInit",
      "originalModule": "angular2/src/core/compiler/interfaces",
      "docType":        "interface"
    },
    {
      "title":          "OpaqueToken",
      "originalModule": "angular2/src/core/di/opaque_token",
      "docType":        "class"
    },
    {
      "title":          "Optional",
      "varType":        "OptionalFactory",
      "originalModule": "angular2/src/core/di/decorators",
      "docType":        "var"
    },
    {
      "title":          "OptionalFactory",
      "originalModule": "angular2/src/core/di/decorators",
      "docType":        "interface"
    },
    {
      "title":          "OptionalMetadata",
      "originalModule": "angular2/src/core/di/metadata",
      "docType":        "class"
    },
    {
      "title":          "OutOfBoundsError",
      "originalModule": "angular2/src/core/di/exceptions",
      "docType":        "class"
    },
    {
      "title":          "Output",
      "varType":        "OutputFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "var"
    },
    {
      "title":          "OutputFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "interface"
    },
    {
      "title":          "OutputMetadata",
      "originalModule": "angular2/src/core/metadata/directives",
      "docType":        "class"
    },
    {
      "title":          "PercentPipe",
      "originalModule": "angular2/src/core/pipes/number_pipe",
      "docType":        "class"
    },
    {
      "title":          "Pipe",
      "varType":        "PipeFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "var"
    },
    {
      "title":          "PipeFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "interface"
    },
    {
      "title":          "PipeMetadata",
      "originalModule": "angular2/src/core/metadata/directives",
      "docType":        "class"
    },
    {
      "title":          "PipeOnDestroy",
      "originalModule": "angular2/src/core/change_detection/pipe_transform",
      "docType":        "interface"
    },
    {
      "title":          "PipeTransform",
      "originalModule": "angular2/src/core/change_detection/pipe_transform",
      "docType":        "interface"
    },
    {
      "title":          "PlatformRef",
      "originalModule": "angular2/src/core/application_ref",
      "docType":        "interface"
    },
    {
      "title":          "Predicate",
      "originalModule": "angular2/src/core/facade/collection",
      "docType":        "interface"
    },
    {
      "title":          "ProtoViewRef",
      "originalModule": "angular2/src/core/compiler/view_ref",
      "docType":        "interface"
    },
    {
      "title":          "Provider",
      "originalModule": "angular2/src/core/di/provider",
      "docType":        "class"
    },
    {
      "title":          "ProviderBuilder",
      "originalModule": "angular2/src/core/di/provider",
      "docType":        "class"
    },
    {
      "title":          "Query",
      "varType":        "QueryFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "var"
    },
    {
      "title":          "QueryFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "interface"
    },
    {
      "title":          "QueryList",
      "originalModule": "angular2/src/core/compiler/query_list",
      "docType":        "class"
    },
    {
      "title":          "QueryMetadata",
      "originalModule": "angular2/src/core/metadata/di",
      "docType":        "class"
    },
    {
      "title":          "RenderBeginCmd",
      "originalModule": "angular2/src/core/render/api",
      "docType":        "interface"
    },
    {
      "title":          "RenderBeginComponentCmd",
      "originalModule": "angular2/src/core/render/api",
      "docType":        "interface"
    },
    {
      "title":          "RenderBeginElementCmd",
      "originalModule": "angular2/src/core/render/api",
      "docType":        "interface"
    },
    {
      "title":          "RenderCommandVisitor",
      "originalModule": "angular2/src/core/render/api",
      "docType":        "interface"
    },
    {
      "title":          "RenderElementRef",
      "originalModule": "angular2/src/core/render/api",
      "docType":        "interface"
    },
    {
      "title":          "RenderEmbeddedTemplateCmd",
      "originalModule": "angular2/src/core/render/api",
      "docType":        "interface"
    },
    {
      "title":          "RenderEventDispatcher",
      "originalModule": "angular2/src/core/render/api",
      "docType":        "interface"
    },
    {
      "title":          "RenderFragmentRef",
      "originalModule": "angular2/src/core/render/api",
      "docType":        "class"
    },
    {
      "title":          "RenderNgContentCmd",
      "originalModule": "angular2/src/core/render/api",
      "docType":        "interface"
    },
    {
      "title":          "RenderProtoViewRef",
      "originalModule": "angular2/src/core/render/api",
      "docType":        "class"
    },
    {
      "title":          "RenderTemplateCmd",
      "originalModule": "angular2/src/core/render/api",
      "docType":        "interface"
    },
    {
      "title":          "RenderTextCmd",
      "originalModule": "angular2/src/core/render/api",
      "docType":        "interface"
    },
    {
      "title":          "RenderViewRef",
      "originalModule": "angular2/src/core/render/api",
      "docType":        "class"
    },
    {
      "title":          "RenderViewWithFragments",
      "originalModule": "angular2/src/core/render/api",
      "docType":        "class"
    },
    {
      "title":          "Renderer",
      "originalModule": "angular2/src/core/render/api",
      "docType":        "class"
    },
    {
      "title":          "RequiredValidator",
      "originalModule": "angular2/src/core/forms/directives/validators",
      "docType":        "class"
    },
    {
      "title":          "ResolvedBinding",
      "originalModule": "angular2/src/core/di/binding",
      "docType":        "class"
    },
    {
      "title":          "ResolvedFactory",
      "originalModule": "angular2/src/core/di/binding",
      "docType":        "class"
    },
    {
      "title":          "ResolvedProvider",
      "originalModule": "angular2/src/core/di/provider",
      "docType":        "interface"
    },
    {
      "title":          "Scope",
      "originalModule": "angular2/src/core/debug/debug_element",
      "docType":        "class"
    },
    {
      "title":          "SelectControlValueAccessor",
      "originalModule": "angular2/src/core/forms/directives/select_control_value_accessor",
      "docType":        "directive"
    },
    {
      "title":          "Self",
      "varType":        "SelfFactory",
      "originalModule": "angular2/src/core/di/decorators",
      "docType":        "var"
    },
    {
      "title":          "SelfFactory",
      "originalModule": "angular2/src/core/di/decorators",
      "docType":        "interface"
    },
    {
      "title":          "SelfMetadata",
      "originalModule": "angular2/src/core/di/metadata",
      "docType":        "class"
    },
    {
      "title":          "SimpleChange",
      "originalModule": "angular2/src/core/change_detection/change_detection_util",
      "docType":        "class"
    },
    {
      "title":          "SkipSelf",
      "varType":        "SkipSelfFactory",
      "originalModule": "angular2/src/core/di/decorators",
      "docType":        "var"
    },
    {
      "title":          "SkipSelfFactory",
      "originalModule": "angular2/src/core/di/decorators",
      "docType":        "interface"
    },
    {
      "title":          "SkipSelfMetadata",
      "originalModule": "angular2/src/core/di/metadata",
      "docType":        "class"
    },
    {
      "title":          "SlicePipe",
      "originalModule": "angular2/src/core/pipes/slice_pipe",
      "docType":        "class"
    },
    {
      "title":          "TemplateRef",
      "originalModule": "angular2/src/core/compiler/template_ref",
      "docType":        "class"
    },
    {
      "title":          "Title",
      "originalModule": "angular2/src/core/services/title",
      "docType":        "class"
    },
    {
      "title":          "Type",
      "originalModule": "angular2/src/core/facade/lang",
      "docType":        "interface"
    },
    {
      "title":          "TypeDecorator",
      "originalModule": "angular2/src/core/util/decorators",
      "docType":        "interface"
    },
    {
      "title":          "TypeLiteral",
      "originalModule": "angular2/src/core/di/type_literal",
      "docType":        "class"
    },
    {
      "title":          "UpperCasePipe",
      "originalModule": "angular2/src/core/pipes/uppercase_pipe",
      "docType":        "class"
    },
    {
      "title":          "UrlResolver",
      "originalModule": "angular2/src/core/services/url_resolver",
      "docType":        "class"
    },
    {
      "title":          "Validators",
      "originalModule": "angular2/src/core/forms/validators",
      "docType":        "class"
    },
    {
      "title":          "View",
      "varType":        "ViewFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "var"
    },
    {
      "title":          "ViewChild",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "var"
    },
    {
      "title":          "ViewChildFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "interface"
    },
    {
      "title":          "ViewChildMetadata",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "class"
    },
    {
      "title":          "ViewChildren",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "var"
    },
    {
      "title":          "ViewChildrenFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "interface"
    },
    {
      "title":          "ViewChildrenMetadata",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "class"
    },
    {
      "title":          "ViewContainerRef",
      "originalModule": "angular2/src/core/compiler/view_container_ref",
      "docType":        "class"
    },
    {
      "title":          "ViewDecorator",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "interface"
    },
    {
      "title":          "ViewEncapsulation",
      "originalModule": "angular2/src/core/render/api",
      "docType":        "enum"
    },
    {
      "title":          "ViewFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "interface"
    },
    {
      "title":          "ViewMetadata",
      "originalModule": "angular2/src/core/metadata/view",
      "docType":        "class"
    },
    {
      "title":          "ViewQuery",
      "varType":        "QueryFactory",
      "originalModule": "angular2/src/core/metadata",
      "docType":        "var"
    },
    {
      "title":          "ViewQueryMetadata",
      "originalModule": "angular2/src/core/metadata/di",
      "docType":        "class"
    },
    {
      "title":          "ViewRef",
      "originalModule": "angular2/src/core/compiler/view_ref",
      "docType":        "class"
    },
    {
      "title":          "WrappedException",
      "originalModule": "angular2/src/core/facade/exceptions",
      "docType":        "class"
    },
    {
      "title":          "WrappedValue",
      "originalModule": "angular2/src/core/change_detection/change_detection_util",
      "docType":        "class"
    },
    {
      "title":          "applicationCommonBindings",
      "originalModule": "angular2/src/core/application_ref",
      "docType":        "function"
    },
    {
      "title":          "asNativeElements",
      "originalModule": "angular2/src/core/debug/debug_element",
      "docType":        "function"
    },
    {
      "title":          "bind",
      "originalModule": "angular2/src/core/di/binding",
      "docType":        "function"
    },
    {
      "title":          "bootstrap",
      "originalModule": "angular2/src/core/application_common",
      "docType":        "function"
    },
    {
      "title":          "createNgZone",
      "originalModule": "angular2/src/core/application_ref",
      "docType":        "function"
    },
    {
      "title":          "forwardRef",
      "originalModule": "angular2/src/core/di/forward_ref",
      "docType":        "function"
    },
    {
      "title":          "inspectElement",
      "originalModule": "angular2/src/core/debug/debug_element",
      "docType":        "function"
    },
    {
      "title":          "inspectNativeElement",
      "originalModule": "angular2/src/core/debug/debug_element_view_listener",
      "docType":        "function"
    },
    {
      "title":          "platform",
      "originalModule": "angular2/src/core/application_common",
      "docType":        "function"
    },
    {
      "title":          "platformBindings",
      "originalModule": "angular2/src/core/application_ref",
      "docType":        "function"
    },
    {
      "title":          "platformCommon",
      "originalModule": "angular2/src/core/application_ref",
      "docType":        "function"
    },
    {
      "title":          "provide",
      "originalModule": "angular2/src/core/application_common",
      "docType":        "function"
    },
    {
      "title":          "resolveForwardRef",
      "originalModule": "angular2/src/core/di/forward_ref",
      "docType":        "function"
    },
    {
      "title":          "workaround_empty_observable_list_diff",
      "originalModule": "angular2/src/core/directives/observable_list_diff",
      "docType":        "var"
    }
  ];
  $scope.apiList.http            = [
    {
      "title":          "BaseRequestOptions",
      "originalModule": "angular2/src/http/base_request_options",
      "docType":        "class"
    },
    {
      "title":          "BaseResponseOptions",
      "originalModule": "angular2/src/http/base_response_options",
      "docType":        "class"
    },
    {
      "title":          "BrowserXhr",
      "originalModule": "angular2/src/http/backends/browser_xhr",
      "docType":        "class"
    },
    {
      "title":          "HTTP_BINDINGS",
      "originalModule": "angular2/http",
      "docType":        "const"
    },
    {
      "title":          "HTTP_PROVIDERS",
      "originalModule": "angular2/http",
      "docType":        "const"
    },
    {
      "title":          "Headers",
      "originalModule": "angular2/src/http/headers",
      "docType":        "class"
    },
    {
      "title":          "Http",
      "originalModule": "angular2/src/http/http",
      "docType":        "class"
    },
    {
      "title":          "JSONPBackend",
      "originalModule": "angular2/src/http/backends/jsonp_backend",
      "docType":        "interface"
    },
    {
      "title":          "JSONPConnection",
      "originalModule": "angular2/src/http/backends/jsonp_backend",
      "docType":        "interface"
    },
    {
      "title":          "JSONP_BINDINGS",
      "originalModule": "angular2/http",
      "docType":        "const"
    },
    {
      "title":          "JSONP_PROVIDERS",
      "originalModule": "angular2/http",
      "docType":        "const"
    },
    {
      "title":          "JSON_BINDINGS",
      "originalModule": "angular2/http",
      "docType":        "const"
    },
    {
      "title":          "Jsonp",
      "originalModule": "angular2/src/http/http",
      "docType":        "class"
    },
    {
      "title":          "MockBackend",
      "originalModule": "angular2/src/http/backends/mock_backend",
      "docType":        "class"
    },
    {
      "title":          "MockConnection",
      "originalModule": "angular2/src/http/backends/mock_backend",
      "docType":        "class"
    },
    {
      "title":          "ReadyStates",
      "originalModule": "angular2/src/http/enums",
      "docType":        "enum"
    },
    {
      "title":          "Request",
      "originalModule": "angular2/src/http/static_request",
      "docType":        "class"
    },
    {
      "title":          "RequestMethods",
      "originalModule": "angular2/src/http/enums",
      "docType":        "enum"
    },
    {
      "title":          "RequestOptions",
      "originalModule": "angular2/src/http/base_request_options",
      "docType":        "class"
    },
    {
      "title":          "RequestOptionsArgs",
      "originalModule": "angular2/src/http/interfaces",
      "docType":        "interface"
    },
    {
      "title":          "Response",
      "originalModule": "angular2/src/http/static_response",
      "docType":        "class"
    },
    {
      "title":          "ResponseOptions",
      "originalModule": "angular2/src/http/base_response_options",
      "docType":        "class"
    },
    {
      "title":          "ResponseOptionsArgs",
      "originalModule": "angular2/src/http/interfaces",
      "docType":        "interface"
    },
    {
      "title":          "ResponseTypes",
      "originalModule": "angular2/src/http/enums",
      "docType":        "enum"
    },
    {
      "title":          "URLSearchParams",
      "originalModule": "angular2/src/http/url_search_params",
      "docType":        "class"
    },
    {
      "title":          "XHRBackend",
      "originalModule": "angular2/src/http/backends/xhr_backend",
      "docType":        "class"
    },
    {
      "title":          "XHRConnection",
      "originalModule": "angular2/src/http/backends/xhr_backend",
      "docType":        "class"
    }
  ];
  $scope.apiList.lifecycle_hooks = [
    {
      "title":          "AfterContentChecked",
      "originalModule": "angular2/src/core/compiler/interfaces",
      "docType":        "class"
    },
    {
      "title":          "AfterContentInit",
      "originalModule": "angular2/src/core/compiler/interfaces",
      "docType":        "class"
    },
    {
      "title":          "AfterViewChecked",
      "originalModule": "angular2/src/core/compiler/interfaces",
      "docType":        "class"
    },
    {
      "title":          "AfterViewInit",
      "originalModule": "angular2/src/core/compiler/interfaces",
      "docType":        "class"
    },
    {
      "title":          "DoCheck",
      "originalModule": "angular2/src/core/compiler/interfaces",
      "docType":        "class"
    },
    {
      "title":          "OnChanges",
      "originalModule": "angular2/src/core/compiler/interfaces",
      "docType":        "class"
    },
    {
      "title":          "OnDestroy",
      "originalModule": "angular2/src/core/compiler/interfaces",
      "docType":        "class"
    },
    {
      "title":          "OnInit",
      "originalModule": "angular2/src/core/compiler/interfaces",
      "docType":        "class"
    }
  ];
  $scope.apiList.router          = [
    {
      "title":          "APP_BASE_HREF",
      "varType":        "OpaqueToken",
      "originalModule": "angular2/src/router/location",
      "docType":        "const"
    },
    {
      "title":          "AsyncRoute",
      "originalModule": "angular2/src/router/route_config_impl",
      "docType":        "class"
    },
    {
      "title":          "AuxRoute",
      "originalModule": "angular2/src/router/route_config_impl",
      "docType":        "class"
    },
    {
      "title":          "CanActivate",
      "originalModule": "angular2/src/router/lifecycle_annotations",
      "docType":        "var"
    },
    {
      "title":          "CanDeactivate",
      "originalModule": "angular2/src/router/interfaces",
      "docType":        "interface"
    },
    {
      "title":          "CanReuse",
      "originalModule": "angular2/src/router/interfaces",
      "docType":        "interface"
    },
    {
      "title":          "ComponentDefinition",
      "originalModule": "angular2/src/router/route_definition",
      "docType":        "interface"
    },
    {
      "title":          "ComponentInstruction",
      "originalModule": "angular2/src/router/instruction",
      "docType":        "interface"
    },
    {
      "title":          "HashLocationStrategy",
      "originalModule": "angular2/src/router/hash_location_strategy",
      "docType":        "class"
    },
    {
      "title":          "Instruction",
      "originalModule": "angular2/src/router/instruction",
      "docType":        "class"
    },
    {
      "title":          "Location",
      "originalModule": "angular2/src/router/location",
      "docType":        "class"
    },
    {
      "title":          "OnActivate",
      "originalModule": "angular2/src/router/interfaces",
      "docType":        "interface"
    },
    {
      "title":          "OnDeactivate",
      "originalModule": "angular2/src/router/interfaces",
      "docType":        "interface"
    },
    {
      "title":          "OnReuse",
      "originalModule": "angular2/src/router/interfaces",
      "docType":        "interface"
    },
    {
      "title":          "OpaqueToken",
      "originalModule": "angular2/src/core/di/opaque_token",
      "docType":        "class"
    },
    {
      "title":          "PathLocationStrategy",
      "originalModule": "angular2/src/router/path_location_strategy",
      "docType":        "class"
    },
    {
      "title":          "ROUTER_BINDINGS",
      "originalModule": "angular2/router",
      "docType":        "const"
    },
    {
      "title":          "ROUTER_DIRECTIVES",
      "originalModule": "angular2/router",
      "docType":        "const"
    },{
      "title":          "ROUTER_PRIMARY_COMPONENT",
      "originalModule": "angular2/router",
      "docType":        "const"
    },
    {
      "title":          "ROUTER_PROVIDERS",
      "originalModule": "angular2/router",
      "docType":        "const"
    },
    {
      "title":          "ROUTE_DATA",
      "varType":        "OpaqueToken",
      "originalModule": "angular2/src/router/route_data",
      "docType":        "const"
    },
    {
      "title":          "Redirect",
      "originalModule": "angular2/src/router/route_config_impl",
      "docType":        "class"
    },
    {
      "title":          "Route",
      "originalModule": "angular2/src/router/route_config_impl",
      "docType":        "class"
    },
    {
      "title":          "RouteConfig",
      "originalModule": "angular2/src/router/route_config_decorator",
      "docType":        "var"
    },
    {
      "title":          "RouteDefinition",
      "originalModule": "angular2/src/router/route_definition",
      "docType":        "interface"
    },
    {
      "title":          "RouteParams",
      "originalModule": "angular2/src/router/instruction",
      "docType":        "class"
    },
    {
      "title":          "RouteRegistry",
      "originalModule": "angular2/src/router/route_registry",
      "docType":        "class"
    },
    {
      "title":          "Router",
      "originalModule": "angular2/src/router/router",
      "docType":        "class"
    },
    {
      "title":          "RouterLink",
      "originalModule": "angular2/src/router/router_link",
      "docType":        "class"
    },
    {
      "title":          "RouterOutlet",
      "originalModule": "angular2/src/router/router_outlet",
      "docType":        "interface"
    },
    {
      "title":          "routerBindings",
      "originalModule": "angular2/router",
      "docType":        "function"
    }
  ];
  $scope.apiList.test            = [
    {
      "title":          "AnyTestFn",
      "originalModule": "angular2/src/testing/testing",
      "docType":        "type-alias"
    },
    {
      "title":          "AsyncTestCompleter",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "class"
    },
    {
      "title":          "AsyncTestFn",
      "originalModule": "angular2/src/testing/testing",
      "docType":        "type-alias"
    },
    {
      "title":          "FunctionWithParamTokens",
      "originalModule": "angular2/src/test_lib/test_injector",
      "docType":        "class"
    },
    {
      "title":          "GuinessCompatibleSpy",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "interface"
    },
    {
      "title":          "NgMatchers",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "interface"
    },
    {
      "title":          "RootTestComponent",
      "originalModule": "angular2/src/test_lib/test_component_builder",
      "docType":        "class"
    },
    {
      "title":          "SpyObject",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "class"
    },
    {
      "title":          "SyncTestFn",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "type-alias"
    },
    {
      "title":          "TestComponentBuilder",
      "originalModule": "angular2/src/test_lib/test_component_builder",
      "docType":        "class"
    },
    {
      "title":          "afterEach",
      "varType":        "Function",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "var"
    },
    {
      "title":          "beforeEach",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "function"
    },
    {
      "title":          "beforeEachBindings",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "function"
    },
    {
      "title":          "clearPendingTimers",
      "originalModule": "angular2/src/test_lib/fake_async",
      "docType":        "function"
    },
    {
      "title":          "createTestInjector",
      "originalModule": "angular2/src/test_lib/test_injector",
      "docType":        "function"
    },
    {
      "title":          "ddescribe",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "function"
    },
    {
      "title":          "describe",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "function"
    },
    {
      "title":          "expect",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "var"
    },
    {
      "title":          "fakeAsync",
      "originalModule": "angular2/src/test_lib/fake_async",
      "docType":        "function"
    },
    {
      "title":          "fdescribe",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "function"
    },
    {
      "title":          "fit",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "function"
    },
    {
      "title":          "flushMicrotasks",
      "originalModule": "angular2/src/test_lib/fake_async",
      "docType":        "function"
    },
    {
      "title":          "iit",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "function"
    },
    {
      "title":          "inject",
      "originalModule": "angular2/src/test_lib/test_injector",
      "docType":        "function"
    },
    {
      "title":          "injectAsync",
      "originalModule": "angular2/src/test_lib/inject_async",
      "docType":        "function"
    },
    {
      "title":          "isInInnerZone",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "function"
    },
    {
      "title":          "it",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "function"
    },
    {
      "title":          "proxy",
      "varType":        "ClassDecorator",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "var"
    },
    {
      "title":          "tick",
      "originalModule": "angular2/src/test_lib/fake_async",
      "docType":        "function"
    },
    {
      "title":          "xdescribe",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "function"
    },
    {
      "title":          "xit",
      "originalModule": "angular2/src/test_lib/test_lib",
      "docType":        "function"
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