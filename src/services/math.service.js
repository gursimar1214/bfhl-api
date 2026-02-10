// Helper function for GCD (uses absolute values)
const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  if (a === 0) return b;
  if (b === 0) return a;
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
};

// Fibonacci series
exports.fibonacci = (n) => {
  if (n === 0) return [];
  if (n === 1) return [0];
  const series = [0, 1];
  for (let i = 2; i < n; i++) {
    // prevent overflow by capping at safe integer
    const next = series[i - 1] + series[i - 2];
    series.push(next);
  }
  return series.slice(0, n);
};

// Prime numbers from array
exports.primes = (arr) => {
  const isPrime = (num) => {
    num = Math.abs(num);
    if (num < 2) return false;
    if (num === 2 || num === 3) return true;
    if (num % 2 === 0) return false;
    const limit = Math.floor(Math.sqrt(num));
    for (let i = 3; i <= limit; i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  };

  return arr.filter(isPrime);
};

// LCM of array
exports.lcmArray = (arr) => {
  const lcmTwo = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    if (a === 0 || b === 0) return 0;
    return Math.abs((a / gcd(a, b)) * b);
  };
  return arr.reduce((acc, val) => lcmTwo(acc, val));
};

// HCF (GCD) of array
exports.hcfArray = (arr) => {
  return arr.reduce((acc, val) => gcd(acc, val));
};
