// Create custom DOM event the old fashioned way
// Although officially deprecated - https://developer.mozilla.org/en-US/docs/Web/API/Event/initEvent
// some browsers (phantom) don't except `new Event(eventName)'
export function newEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}
