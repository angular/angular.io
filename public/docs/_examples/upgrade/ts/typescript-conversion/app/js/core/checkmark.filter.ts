// #docregion
export default function checkmarkFilter() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
}
