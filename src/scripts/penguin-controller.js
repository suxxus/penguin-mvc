const fetch = require('isomorphic-fetch');

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

const preloadImgs = ({ data = [] }, index = 1) => {
  if (index === data.length) return;

  fetch(data[index].imageUrl, { method: 'GET', mode: 'no-cors' })
    .then(() => { preloadImgs({ data }, index + 1); })
    .catch(error => console.error(error.message));
};

const initialize = (penguinModel = {}, penguinView = {}) => {
  penguinView.initPenguinView();
  penguinView.penguinControlls();
  penguinView.addEventClickListener(clickEvtListener(penguinModel));

  subscribeModelListeners(
    penguinView,
    penguinModel.subscribe,
    penguinModel.DATA_UPDATE);

  penguinModel.fetchData()
    .then(() => { preloadImgs(penguinModel.getModel()); });
};

module.exports = {
  initialize,
};
