// #docregion
export class KeyCodeService {

  getNavigationKey(keyCode: number): any {
    let key: any = {
      up:    keyCode === 38,
      down:  keyCode === 40,
      right: keyCode === 39,
      left:  keyCode === 37,
      tab:   keyCode === 9,
    };
    key.isArrowKey = key.up || key.down || key.right || key.left;

    return key;
  }
}

