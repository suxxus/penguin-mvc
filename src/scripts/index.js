const controller = require('./penguin-controller');
const view = require('./penguin-view');
const model = require('./penguin-model');

const modelWithUrl = () =>
  Object.assign({},
    model, { fetchData: model.fetchData('/api') });

const viewWithRoot = () =>
  Object.assign({},
    view, { initPenguinView: view.initPenguinView({ id: 'root' }) });

const onDOMContentLoaded = () => {
  controller.initialize(modelWithUrl(), viewWithRoot());
};

window.document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
