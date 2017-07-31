const controller = require('./penguin-controller');
const view = require('./penguin-view');
const model = require('./penguin-model');

const modeWithUrl = () =>
  Object.assign({},
    model, { fetchData: model.fetchData('http://localhost:4000/api') });

const viewWithRoot = () =>
  Object.assign({},
    view, { initPenguinView: view.initPenguinView({ id: 'root' }) });

const onDOMContentLoaded = () => {
  controller.initialize(modeWithUrl(), viewWithRoot());
};

window.document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
