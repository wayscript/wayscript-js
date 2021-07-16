var wayscript = require('../');

test('adds 1 + 2 to equal 3', () => {
  expect(wayscript.sum(1, 2)).toBe(3);
});