const assert = require('assert');
const math = require('../src/services/math.service');

// Fibonacci basic
assert.deepStrictEqual(math.fibonacci(7), [0,1,1,2,3,5,8]);

// Primes filter
assert.deepStrictEqual(math.primes([2,4,7,9,11]), [2,7,11]);

// LCM
assert.strictEqual(math.lcmArray([12,18,24]), 72);

// HCF
assert.strictEqual(math.hcfArray([24,36,60]), 12);

console.log('Basic tests passed');
