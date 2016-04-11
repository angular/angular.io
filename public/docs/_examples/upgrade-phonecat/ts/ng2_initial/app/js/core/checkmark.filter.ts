// #docregion
export default function checkmarkFilter() {
  return function(input:string):string {
    return input ? '\u2713' : '\u2718';
  };
}
