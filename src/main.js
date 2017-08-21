import  util from './util.js';

console.dir(util);

console.log('util.isArray(true)',util.isArray(true));
console.log('util.isArray([])',util.isArray([]));
console.log('util.isArray(str)',util.isArray("str"));
console.log('util.isObject({})',util.isObject({}));
console.log('util.isObject([])',util.isObject([]));

console.log('util.isNumber(11)',util.isNumber(11));
console.log('util.isNumber(true)',util.isNumber(true));
console.log('util.isNumber("ddd")',util.isNumber("ddd"));

console.log('util.isFunction("ddd")',util.isFunction("ddd"));
console.log('util.isFunction(function () {})',util.isFunction(function () {}));


console.log('util.isString("ddd")',util.isString("ddd"));
