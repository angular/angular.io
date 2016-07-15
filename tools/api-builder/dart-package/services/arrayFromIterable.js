'use strict';

module.exports = function arrayFromIterable(iterable) {
    const arr = [];
    for (let e of iterable) arr.push(e);
    return arr;
};
