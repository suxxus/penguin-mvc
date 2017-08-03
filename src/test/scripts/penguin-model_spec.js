const test = require('blue-tape');
const { fetchData, shouldBeUpdated } = require('scripts/penguin-model');

const describe = test;
const baseUrl = 'http://localhost:4000/api';

describe('model', (assert) => {
  assert.end();
});

test('fetchData', assert => fetchData(`${baseUrl}`)()
  .then((done) => {
    const actual = done;
    const expect = 'done';
    assert.equal(actual, expect, 'fetchData success');
  }));

test('shouldBeUpdated', (assert) => {
  let actual;
  let expect;

  actual = shouldBeUpdated(1, { index: 0, data: [1, 2] });
  expect = true;
  assert.equal(actual, expect, 'should be updated');

  actual = shouldBeUpdated(-1, { index: 0, data: [1, 2] });
  expect = false;
  assert.equal(actual, expect, 'should not be updated');

  assert.end();
});
