const dataUpdateListener = ({ updatePenguin }) => (topic, { data, index }) => {
  updatePenguin(data[index]);
};

const subscribeModelListeners = (penguinView = {}, penguinModel = {}) => {
  const { DATA_UPDATE, API_START, subscribe } = penguinModel;
  const { showSpinner } = penguinView;
  subscribe([
    { topic: API_START, callback: () => showSpinner() },
    { topic: DATA_UPDATE, callback: dataUpdateListener(penguinView) },
  ]);
};

const clickEvtListener = ({ updateIndex }) => ({ target }) => {
  if (target.nodeName !== 'BUTTON') return;

  const values = {
    'next-penguin': 1,
    'previous-penguin': -1,
  };

  updateIndex(values[target.id]);
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
