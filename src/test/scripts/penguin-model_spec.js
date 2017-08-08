const test = require('blue-tape');
const {
  fetchData,
  dataReducer,
  indexReducer,
  updateModel,
  objsNotEquals,
  DATA_UPDATE,
  INDEX_UPDATE,
} = require('scripts/penguin-model')();

const actionsIndexReducer = [
  { type: INDEX_UPDATE, payload: { idx: 1, dataLen: 4 } },
  { type: INDEX_UPDATE, payload: { idx: 1, dataLen: 4 } },
  { type: INDEX_UPDATE, payload: { idx: 1, dataLen: 4 } },
  { type: INDEX_UPDATE, payload: { idx: 1, dataLen: 4 } },
  { type: INDEX_UPDATE, payload: { idx: 1, dataLen: 4 } },
];

const actionsDataReducer = [
  { type: DATA_UPDATE, payload: [1, 2] },
];

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

  actual = actionsDataReducer.reduce(dataReducer, []);
  expect = [1, 2];
  assert.deepEqual(actual, expect, 'data is updated');

  actual = actionsIndexReducer.reduce(dataReducer, []);
  expect = [];
  assert.deepEqual(actual, expect, 'returns default data');

  assert.end();
});

test('indexReducer', (assert) => {
  let actual;
  let expect;

  actual = actionsIndexReducer.reduce(indexReducer, 0);
  expect = 3;
  assert.equal(actual, expect, 'index is updated');

  actual = actionsDataReducer.reduce(indexReducer, 0);
  expect = 0;
  assert.equal(actual, expect, 'returns default index');


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
