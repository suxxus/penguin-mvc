const PubSub = require('pubsub-js');
const fetch = require('isomorphic-fetch');

const DATA_UPDATE = 'data.updated';
const API_START = 'api.start';

let model = {
  data: [],
  index: 0,
};

const getModel = () => Object.assign({}, model);

const apiStart = () => {
  PubSub.publish(API_START);
};

const dataUpdate = () => {
  PubSub.publish(DATA_UPDATE, getModel());
};

const setData = (data) => {
  model = Object.assign({}, model, { data });
  dataUpdate();
};

const shouldBeUpdated = (idx, { index, data }) =>
  (index + idx >= 0) && (index + idx <= data.length - 1);

const add = value =>
  getModel().index + value;

const updateIndex = (idx) => {
  if (shouldBeUpdated(idx, getModel())) {
    model = Object.assign({}, model, { index: add(idx) });
    dataUpdate();
  }
};

const subscribe = (subscribers) => {
  subscribers.forEach(({ topic, callback }) => {
    PubSub.subscribe(topic, callback);
  });
};

const preloadImgs = (data = [], index = 0) => {
  if (index === data.length) {
    setData(data);
    return;
  }

  fetch(data[index].imageUrl, { method: 'GET', mode: 'no-cors' })
    .then(() => { preloadImgs(data, index + 1); })
    .catch(error => console.error(error.message)); // eslint-disable-line no-console
};

const fetchData = endpoint => () => {
  apiStart();
  return fetch(`${endpoint}/data`)
    .then((resp) => {
      if (resp.status === 200) {
        return resp.json();
      }
      return Promise.reject(new Error(`error:${resp.status}`));
    })
    .then(preloadImgs)
    .then(() => 'done')
    .catch((err) => {
      console.error(err.message); // eslint-disable-line no-console
    });
};

module.exports = {
  shouldBeUpdated,
  fetchData,
  updateIndex,
  subscribe,
  DATA_UPDATE,
  API_START,
};
