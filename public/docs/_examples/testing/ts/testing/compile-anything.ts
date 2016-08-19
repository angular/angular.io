import { SecurityContext }       from '@angular/core';
import { ElementSchemaRegistry } from '@angular/compiler';
import { TestBed }               from '@angular/core/testing';

export class CompileAnythingElementSchemaRegistry implements ElementSchemaRegistry {
  hasProperty(tagName: string, propName: string, schemaMetas: any): boolean {
    return true;
  }

  securityContext(tagName: string, propName: string): any {
    return SecurityContext.NONE;
  }

  getMappedPropName(propName: string): string {
    return propName;
  }

  getDefaultComponentElementName(): string {
    return 'DIV';
  }
}

export const compileAnythingProvider = { provide: ElementSchemaRegistry, useClass: CompileAnythingElementSchemaRegistry };

/**
 * Tells TestBed compiler to compile anything it recognizes.
 *
 * WARNING: Ignores unrecognized elements and bindings.
 */
export function compileAnything() {
  TestBed.configureCompiler({
    providers: [{ provide: ElementSchemaRegistry, useClass: CompileAnythingElementSchemaRegistry }]
  });
}
/**
 * BeforeEach test it tells TestBed compiler to compile anything it recognizes.
 *
 * WARNING: Ignores unrecognized elements and bindings.
 */
export function beforeEachCompileAnything() {
  beforeEach( compileAnything );
}
