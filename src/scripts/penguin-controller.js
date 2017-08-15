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

const initialize = (penguinModel = {}, penguinView = {}) => {
  penguinView.initPenguinView(penguinView.containerId);
  penguinView.penguinControlls();
  penguinView.addEventClickListener(clickEvtListener(penguinModel.changeIndex));

  subscribeModelListeners(penguinView, penguinModel);
  penguinModel.fetchData(penguinModel.baseUrl);
};

module.exports = {
  initialize,
};
