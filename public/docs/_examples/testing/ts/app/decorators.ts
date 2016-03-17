// @Injectable is a placeholder decorator
// whose sole purpose is to trigger the TS compiler to
// generate the metadata that Angular DI needs for injection.
//
// Metadata generation happens IFF the class has a decorator ... any decorator
// See the `"emitDecoratorMetadata": true` flag in tsconfig.json
//
// For Angular-agnostic classes we can avoid importing from Angular
// and get the metadata generation side-effect
// by creating our own @Injectable decorator

// for the hip Functional Programmer:
export const Injectable = () => (cls:any) => cls;

// for everyone else, this is the same thing
//export function Injectable() { return (cls:any) => cls; }