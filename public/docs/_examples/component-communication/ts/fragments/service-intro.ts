// #docregion service
@Injectable()
export class CommService {
  // ...
}
// #enddocregion
// #docregion components
@Component({
  selector: 'parent-comp',
  template: `
    <child-comp *ng-for='#child of children'>
    </child-comp>
  `,
  providers: [CommService]
})
export class ParentComp {
  constructor(private commService: CommService){
    // ...
  }
  // ...
}

@Component({
  selector: 'child-comp'
  // ...
})
export class ChildComp {
  constructor(private commService: CommService){
    // ...
  }
  // ...
}
// #enddocregion components