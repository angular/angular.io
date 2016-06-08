/* tslint:disable */
export * from '@angular/router-deprecated';

import { Directive, DynamicComponentLoader, ViewContainerRef,
         Injectable, Optional, Input } from '@angular/core';

import { ComponentInstruction, Instruction,
         Router, RouterOutlet} from '@angular/router-deprecated';

let _resolveToTrue = Promise.resolve(true);

const NOT_IMPLEMENTED = (what: string) => {
  throw new Error (`"${what}" is not implemented`);
};


@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()',
    '[attr.href]': 'visibleHref',
    '[class.router-link-active]': 'isRouteActive'
  }
})
export class MockRouterLink  {

  isRouteActive = false;
  visibleHref: string; // the url displayed on the anchor element.

  @Input('routerLink') routeParams: any[];
  @Input() target: string;
  navigatedTo: any[] = null;

  constructor(public router: Router) { }

  onClick() {
    this.navigatedTo = null;

    // If no target, or if target is _self, prevent default browser behavior
    if (!this.target || typeof this.target !== 'string' || this.target === '_self') {
      this.navigatedTo = this.routeParams;
      return false;
    }
    return true;
  }
}

@Directive({selector: 'router-outlet'})
export class MockRouterOutlet extends RouterOutlet {
  name: string = null;

  constructor(
    _viewContainerRef: ViewContainerRef,
    @Optional() _loader: DynamicComponentLoader,
    _parentRouter: Router,
    nameAttr: string) {
    super(_viewContainerRef, _loader, _parentRouter, nameAttr);
      if (nameAttr) {
        this.name = nameAttr;
      }
  }

  /**
   * Called by the Router to instantiate a new component during the commit phase of a navigation.
   * This method in turn is responsible for calling the `routerOnActivate` hook of its child.
   */
  activate(nextInstruction: ComponentInstruction): Promise<any> { NOT_IMPLEMENTED('activate'); return _resolveToTrue; }

  /**
   * Called by the {@link Router} during the commit phase of a navigation when an outlet
   * reuses a component between different routes.
   * This method in turn is responsible for calling the `routerOnReuse` hook of its child.
   */
  reuse(nextInstruction: ComponentInstruction): Promise<any> { NOT_IMPLEMENTED('reuse'); return _resolveToTrue; }

  /**
   * Called by the {@link Router} when an outlet disposes of a component's contents.
   * This method in turn is responsible for calling the `routerOnDeactivate` hook of its child.
   */
  deactivate(nextInstruction: ComponentInstruction): Promise<any> { NOT_IMPLEMENTED('deactivate'); return _resolveToTrue; }

  /**
   * Called by the {@link Router} during recognition phase of a navigation.
   *
   * If this resolves to `false`, the given navigation is cancelled.
   *
   * This method delegates to the child component's `routerCanDeactivate` hook if it exists,
   * and otherwise resolves to true.
   */
  routerCanDeactivate(nextInstruction: ComponentInstruction): Promise<any> {
    NOT_IMPLEMENTED('routerCanDeactivate'); return _resolveToTrue;
  }

  /**
   * Called by the {@link Router} during recognition phase of a navigation.
   *
   * If the new child component has a different Type than the existing child component,
   * this will resolve to `false`. You can't reuse an old component when the new component
   * is of a different Type.
   *
   * Otherwise, this method delegates to the child component's `routerCanReuse` hook if it exists,
   * or resolves to true if the hook is not present.
   */
  routerCanReuse(nextInstruction: ComponentInstruction): Promise<any> { NOT_IMPLEMENTED('routerCanReuse'); return _resolveToTrue; }

}

@Injectable()
export class MockRouter extends Router {

  mockIsRouteActive = false;
  mockRecognizedInstruction: Instruction;
  outlet: RouterOutlet = null;

  constructor() {
    super(null, null, null, null);
  }

  auxRouter(hostComponent: any): Router { return new MockChildRouter(this, hostComponent); }
  childRouter(hostComponent: any): Router { return new MockChildRouter(this, hostComponent); }

  commit(instruction: Instruction, _skipLocationChange = false): Promise<any> {
    NOT_IMPLEMENTED('commit'); return _resolveToTrue;
  }

  deactivate(instruction: Instruction, _skipLocationChange = false): Promise<any> {
    NOT_IMPLEMENTED('deactivate'); return _resolveToTrue;
  }

  /**
   * Generate an `Instruction` based on the provided Route Link DSL.
   */
  generate(linkParams: any[]): Instruction {
    NOT_IMPLEMENTED('generate');  return null;
  }

  isRouteActive(instruction: Instruction): boolean { return this.mockIsRouteActive; }

  /**
   * Navigate based on the provided Route Link DSL. It's preferred to navigate with this method
   * over `navigateByUrl`.
   *
   * ### Usage
   *
   * This method takes an array representing the Route Link DSL:
   * ```
   * ['./MyCmp', {param: 3}]
   * ```
   * See the {@link RouterLink} directive for more.
   */
  navigate(linkParams: any[]): Promise<any> {
    return Promise.resolve(linkParams);
  }

  /**
   * Navigate to a URL. Returns a promise that resolves when navigation is complete.
   * It's preferred to navigate with `navigate` instead of this method, since URLs are more brittle.
   *
   * If the given URL begins with a `/`, router will navigate absolutely.
   * If the given URL does not begin with `/`, the router will navigate relative to this component.
   */
  navigateByUrl(url: string, _skipLocationChange = false): Promise<any> {
    return Promise.resolve(url);
  }


  /**
   * Navigate via the provided instruction. Returns a promise that resolves when navigation is
   * complete.
   */
  navigateByInstruction(instruction: Instruction, _skipLocationChange = false): Promise<any> {
    return Promise.resolve(instruction);
  }

  /**
   * Subscribe to URL updates from the router
   */
  subscribe(onNext: (v: any) => void, onError?: (v: any) => void) {
    return {onNext, onError};
  }

  /**
   * Given a URL, returns an instruction representing the component graph
   */
  recognize(url: string): Promise<Instruction> {
    return Promise.resolve(this.mockRecognizedInstruction);
  }

  registerPrimaryOutlet(outlet: RouterOutlet): Promise<any> {
    this.outlet = outlet;
    return super.registerPrimaryOutlet(outlet);
  }

  unregisterPrimaryOutlet(outlet: RouterOutlet) {
    super.unregisterPrimaryOutlet(outlet);
    this.outlet = null;
  }
}

class MockChildRouter extends MockRouter {
  constructor(parent: MockRouter, hostComponent: any) {
    super();
    this.parent = parent;
  }


  navigateByUrl(url: string, _skipLocationChange = false): Promise<any> {
    // Delegate navigation to the root router
    return this.parent.navigateByUrl(url, _skipLocationChange);
  }

  navigateByInstruction(instruction: Instruction, _skipLocationChange = false):
      Promise<any> {
    // Delegate navigation to the root router
    return this.parent.navigateByInstruction(instruction, _skipLocationChange);
  }
}
