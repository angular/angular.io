// #docregion
export default function checkmarkFilter() {
  return function(input:boolean):string {
    return input ? '\u2713' : '\u2718';
  };
}
