// #docregion
/* avoid */

@Component({
  selector: 'toh-hero-button',
  template: `<button>OK<button>`
})
export class HeroButtonComponent {
  onInit() { // mispelled
    console.log('The component is initialized');
  }
}
