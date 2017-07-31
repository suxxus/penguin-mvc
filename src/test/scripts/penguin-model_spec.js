const test = require('blue-tape');
const { fetchData /* update */ } = require('scripts/penguin-model');

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

