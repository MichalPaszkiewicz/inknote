var assert = require('assert')
  , nextPrime = require('./../index').nextPrime
  , asyncPrime = require('./../index').asyncPrime;

  suite('asyncPrime', function() {
  test('asyncPrime should return the next prime number', function(done) {
    asyncPrime(128, function(n) {
      assert.equal(131, n, 'Wrong number');
      done();
    });
  });
});