const controller = require('./penguin-controller');
const view = require('./penguin-view');
const model = require('./penguin-model');

const logError = (objName, method) => () => {
  throw Error(`${objName} should implement ${method} method`);
};

// shouldImplement [] -> {x:s}
const shouldImplement = (objName, list = []) => {
  const obj = {};
  list.forEach((item) => {
    obj[item] = logError(objName, item);
  });
  return obj;
};

const modelWithUrl = () =>
  Object.assign({ baseUrl: '/api' },
    shouldImplement('model', [
      'fetchData',
      'changeIndex',
      'subscribe',
    ]),
    model(),
  );

const viewWithRoot = () =>
  Object.assign({ containerId: 'root' },
    shouldImplement('view', [
      'initPenguinView',
      'penguinControlls',
      'addEventClickListener',
    ]),
    view,
  );

const onDOMContentLoaded = () => {
  controller.initialize(modelWithUrl(), viewWithRoot());
};

window.document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
