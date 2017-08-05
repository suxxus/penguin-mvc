const test = require('blue-tape');
const {
  fetchData,
  dataReducer,
  indexReducer,
  updateModel,
  objsNotEquals,
  DATA_UPDATE,
  INDEX_UPDATE,
} = require('scripts/penguin-model');

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

test('dataReducer', (assert) => {
  let actual;
  let expect;
  actual = dataReducer([], { type: DATA_UPDATE, payload: [1, 3, 4] });
  expect = [1, 3, 4];
  assert.deepEqual(actual, expect);

  actual = dataReducer([], { type: '', payload: undefined });
  expect = [];
  assert.deepEqual(actual, expect);

  assert.end();
});

test('indexReducer', (assert) => {
  let actual;
  let expect;
  actual = indexReducer(5, { type: INDEX_UPDATE, payload: { idx: 1, dataLen: 7 } });
  expect = 6;
  assert.deepEqual(actual, expect);

  actual = indexReducer(1, { type: '', payload: undefined });
  expect = 1;
  assert.deepEqual(actual, expect);

  assert.end();
});

test('objsNotEquals', (assert) => {
  const actual = objsNotEquals({ a: 0 }, { b: 1 });
  const expect = true;
  assert.ok(actual, expect);

  assert.end();
});

test('updateModel', (assert) => {
  const actual = updateModel({ type: DATA_UPDATE, payload: [1] });
  const expect = { data: [1], index: 0 };
  assert.deepEqual(actual, expect);

  assert.end();
});
