// import {Directive, ElementRef} from 'angular2/angular2';
// 
// @Directive({
//     selector: '[highlight]',
//     inputs: [
//         'colorName: highlight'
//     ],
//     host: {
//         '(mouseenter)': 'onMouseEnter()',
//         '(mouseleave)': 'onMouseLeave()'
//     }
// })
// 
// export class Highlight {
//     colorName: string;
//     
//     // Leave out the constructor for the first example
//     // Step 3 demonstrate how to use el to actually display a tooltip (using bootstrap)
//     constructor(private el: ElementRef) {
//         console.log(el);
//     }
//     
//     onMouseEnter() {
//         console.log("Enter: " + this.colorName);
//         this.el.nativeElement.setAttribute("style","background-color:" + this.colorName);
//     }
//     onMouseLeave() {
//         console.log("Leave:" + this.colorName);
//         this.el.nativeElement.setAttribute("style","background-color:" + null);
//     }
// }
