exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');

// 上面的代码证明了两件事。一是，在b.js之中，
// a.js没有执行完毕，只执行了第一行。
// 二是，main.js执行到第二行时，不会再次执行b.js，
// 而是输出缓存的b.js的执行结果，即它的第四行。