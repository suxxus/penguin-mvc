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

const clickEvtListener = ({ changeIndex }) => ({ target }) => {
  if (target.nodeName !== 'BUTTON') return;

  const values = {
    'next-penguin': 1,
    'previous-penguin': -1,
  };

  changeIndex(values[target.id]);
};

const initialize = (penguinModel = {}, penguinView = {}) => {
  penguinView.initPenguinView();
  penguinView.penguinControlls();
  penguinView.addEventClickListener(clickEvtListener(penguinModel));
  subscribeModelListeners(penguinView, penguinModel);
  penguinModel.fetchData();
};

module.exports = {
  initialize,
};
