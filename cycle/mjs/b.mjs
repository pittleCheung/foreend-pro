import { foo } from './a.mjs';
console.log('b.mjs');
console.log(foo); // 这里会报错
export let bar = 'bar';