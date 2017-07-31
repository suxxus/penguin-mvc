const benv = require('benv');

const setupBenv = () => {
  benv.setup(() => {
    global.window = window;
    global.document = window.document;
    global.document.body.innerHTML = `
    <div id="root">
    </div>`;
  });

  benv.teardown();
};

module.exports = {
  setupBenv,
};
