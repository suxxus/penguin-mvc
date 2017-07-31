const dataUpdateListener = ({ updatePenguin }) => (topic, { data, index }) => {
  updatePenguin(data[index]);
};

const subscribeModelListeners = (penguinView = {}, subscribe = () => {}, dataUpdate = '') => {
  subscribe([
    { topic: dataUpdate, callback: dataUpdateListener(penguinView) },
  ]);
};

const clickEvtListener = ({ updateIndex }) => ({ target }) => {
  if (target.nodeName !== 'BUTTON') return;

  const getIndex = {
    'next-penguin': 1,
    'previous-penguin': -1,
  };

  updateIndex(getIndex[target.id]);
};

const initialize = (penguinModel = {}, penguinView = {}) => {
  penguinView.initPenguinView();
  penguinView.penguinControlls();
  penguinView.addEventClickListener(clickEvtListener(penguinModel));

  subscribeModelListeners(
    penguinView,
    penguinModel.subscribe,
    penguinModel.DATA_UPDATE);

  penguinModel.fetchData();
};

module.exports = {
  initialize,
};
