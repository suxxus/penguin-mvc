const test = require('tape');

const describe = test;
const { hasOwnProperties } = require('scripts/penguin-controller');

describe('controller', (assert) => {
  assert.end();
});

test('hasOwnProperties', (assert) => {
  const actual = hasOwnProperties({ foo: 1 }, ['foo']);
  const expect = true;
  assert.ok(actual, expect);
  assert.end();
});
