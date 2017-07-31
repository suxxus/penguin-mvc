const PubSub = require('pubsub-js');
const fetch = require('isomorphic-fetch');

const DATA_UPDATE = 'data.updated';

let model = {
  data: [],
  index: 0,
};

const getModel = () => Object.assign({}, model);

const setData = (data) => {
  model = Object.assign({}, model, { data });
  PubSub.publish(DATA_UPDATE, getModel());
};

const updateIndex = (idx) => {
  const { index, data } = getModel();
  if (index + idx < 0) return;
  if (index + idx > data.length - 1) return;

  model = Object.assign({}, model, { index: index + idx });
  PubSub.publish(DATA_UPDATE, getModel());
};

const subscribe = (subscribers) => {
  subscribers.forEach(({ topic, callback }) => {
    PubSub.subscribe(topic, callback);
  });
};

const fetchData = endpoint => () =>
  fetch(`${endpoint}/data`)
    .then((resp) => {
      if (resp.status === 200) {
        return resp.json();
      }
      return Promise.reject(new Error(`error:${resp.status}`));
    })
    .then(setData)
    .then(() => 'done')
    .catch((err) => {
      console.error(err.message); // eslint-disable-line no-console
    });

module.exports = {
  fetchData,
  getModel,
  updateIndex,
  subscribe,
  DATA_UPDATE,
};
