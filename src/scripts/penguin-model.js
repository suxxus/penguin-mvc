const PubSub = require('pubsub-js');
const fetch = require('isomorphic-fetch');

const MODEL_UPDATED = 'model.updated';
const DATA_UPDATE = 'data.update';
const INDEX_UPDATE = 'index.update';
const API_START = 'api.start';

let model = {};

const objsNotEquals = (objOne = {}, objTwo = {}) =>
  JSON.stringify(objOne) !== JSON.stringify(objTwo);

const getModel = () => Object.assign({}, model);

const setModel = (value = {}) => {
  if (objsNotEquals(getModel(), value)) {
    model = value;
    PubSub.publish(MODEL_UPDATED, getModel());
  }
};

const apiStart = () => {
  PubSub.publish(API_START);
};

const dataReducer = (state = [], action = {}) => {
  if (action.type !== DATA_UPDATE) {
    return state;
  }
  return action.payload;
};

const indexReducer = (state = 0, action = {}) => {
  if (action.type !== INDEX_UPDATE) {
    return state;
  }

  const { idx, dataLen } = action.payload;

  if ((state + idx >= 0) && (state + idx <= dataLen - 1)) {
    return state + idx;
  }
  return state;
};

const updateModel = (action = {}) => ({
  data: dataReducer(getModel().data, action),
  index: indexReducer(getModel().index, action),
});

const changeIndex = (idx = 0) => {
  setModel(
    updateModel({
      type: INDEX_UPDATE,
      payload: { idx, dataLen: getModel().data.length },
    }));
};

const subscribe = (subscribers) => {
  subscribers.forEach(({ topic, callback }) => {
    PubSub.subscribe(topic, callback);
  });
};

const preloadImgs = (data = [], index = 0) => {
  if (index === data.length) {
    setModel(
      updateModel({
        type: DATA_UPDATE,
        payload: data,
      }));

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
  updateModel,
  dataReducer,
  indexReducer,
  fetchData,
  changeIndex,
  subscribe,
  objsNotEquals,
  MODEL_UPDATED,
  DATA_UPDATE,
  INDEX_UPDATE,
  API_START,
};
