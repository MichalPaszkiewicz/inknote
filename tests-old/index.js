function nextPrime(n) {
  var smaller;
  n = Math.floor(n);

  if (n >= 2) {
    smaller = 1;
    while (smaller * smaller <= n) {
      n++;
      smaller = 2;
      while ((n % smaller > 0) && (smaller * smaller <= n)) {
        smaller++;
      }
    }
    return n;
  } else {
    return 2;
  }
}

function asyncPrime(n, fn) {
  setTimeout(function() {
    fn(nextPrime(n));
  }, 10);
}

module.exports.nextPrime = nextPrime;
module.exports.asyncPrime = asyncPrime;