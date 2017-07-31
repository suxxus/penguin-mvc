const sinon = require('sinon');
const test = require('tape');
const {
  addEventClickListener,
  initPenguinView,
  penguinTitle,
  penguinImage,
  penguinInfo,
  penguinControlls,
} = require('scripts/penguin-view.js');

const describe = test;

const $qs = selector => window.document.querySelector.bind(window.document)(selector);
let $penguinView;
let $root;

describe('view', (assert) => {
  assert.end();
  $root = $qs('#root');

  $root.innerHTML = `
    <div id="penguinView">
        <header></header>
        <section class="penguin-image"></section>
        <section class="penguin-info"></section>
        <section class="penguin-controlls"></section>
      </div>
  `;

  $penguinView = $qs('#penguinView');
});

test('addEventClickListener', (assert) => {
  const callback = sinon.spy();

  addEventClickListener(callback);
  $penguinView.click();

  const actual = callback.calledOnce;
  const expect = true;

  assert.equal(actual, expect, 'evtListener was called once');
  assert.end();
});

test('penguinTitle', (assert) => {
  penguinTitle({ name: 'Emperror' });
  const actual = $penguinView.innerHTML.search('Emperror') !== -1;
  const expect = true;

  assert.ok(actual, expect);
  assert.end();
});

test('penguinImage', (assert) => {
  let actual;
  let expect;

  penguinImage({ imageUrl: 'http://image', name: 'Emperror' });

  actual = $penguinView.innerHTML.search('image Emperror') !== -1;
  expect = true;
  assert.ok(actual, expect);

  actual = $penguinView.innerHTML.search('http://image') !== -1;
  expect = true;
  assert.ok(actual, expect);


  assert.end();
});

test('penguinInfo', (assert) => {
  let actual;
  let expect;

  penguinInfo({ size: '36.7kg(m) 25.8kg(f)', favoriteFood: 'krill' });

  actual = $penguinView.innerHTML.indexOf('36.7kg(m)') !== -1;
  expect = true;
  assert.ok(actual, expect);

  actual = $penguinView.innerHTML.search('krill') !== -1;
  expect = true;
  assert.ok(actual, expect);

  assert.end();
});

test('penguinControlls', (assert) => {
  let actual;
  let expect;

  penguinControlls();
  actual = $penguinView.innerHTML.search('previous-penguin') !== -1;
  expect = true;
  assert.ok(actual, expect);

  penguinControlls();
  actual = $penguinView.innerHTML.search('next-penguin') !== -1;
  expect = true;
  assert.ok(actual, expect);

  assert.end();
});

test('initPenguinView', (assert) => {
  let actual;
  let expect;

  initPenguinView({ id: 'root' })();

  actual = $root.innerHTML.search('penguinView') !== -1;
  expect = true;
  assert.equal(actual, expect, 'penguinView exist');

  actual = $root.innerHTML.search('header') !== -1;
  expect = true;
  assert.equal(actual, expect, 'header element exists');

  actual = $root.innerHTML.search('penguin-image') !== -1;
  expect = true;
  assert.equal(actual, expect, 'penguin-image exists');

  actual = $root.innerHTML.search('penguin-info') !== -1;
  expect = true;
  assert.equal(actual, expect, 'penguin-info exists');

  actual = $root.innerHTML.search('penguin-controlls') !== -1;
  expect = true;
  assert.equal(actual, expect, 'penguin-controlls exists');

  assert.end();
});

