const dataUpdateListener = ({ updatePenguin }) => (topic, { data, index }) => {
  updatePenguin(data[index]);
};

const subscribeModelListeners = (penguinView = {}, penguinModel = {}) => {
  const { MODEL_UPDATED, API_START, subscribe } = penguinModel;
  const { showSpinner } = penguinView;
  subscribe([
    { topic: API_START, callback: () => showSpinner() },
    { topic: MODEL_UPDATED, callback: dataUpdateListener(penguinView) },
  ]);
};

const clickEvtListener = action => ({ target }) => {
  if (target.nodeName !== 'BUTTON') return;

  const values = {
    'next-penguin': 1,
    'previous-penguin': -1,
  };

  action(values[target.id]);
};

// helper to check properties
const hasOwnProperties = (obj = {}, props = []) =>
  props.every(prop => obj[prop]);

const safeInit = (penguinView = {}, penguinModel = {}) => {
  penguinView.initPenguinView();
  penguinView.penguinControlls();
  penguinView.addEventClickListener(clickEvtListener(penguinModel.changeIndex));

  subscribeModelListeners(penguinView, penguinModel);
  penguinModel.fetchData();
};

const initialize = (penguinModel = {}, penguinView = {}) => {
  const penguinModelOk = hasOwnProperties(
    penguinModel, ['fetchData', 'subscribe', 'MODEL_UPDATED', 'API_START', 'changeIndex']);

  const penguinViewOk = hasOwnProperties(
    penguinView, ['initPenguinView', 'penguinControlls', 'addEventClickListener', 'updatePenguin', 'showSpinner']);

  const action = (penguinModelOk && penguinViewOk) ? safeInit :
    () => { throw new Error('some properties are undefined, can not initialize app'); };

  action(penguinView, penguinModel);
};

module.exports = {
  hasOwnProperties,
  initialize,
};
