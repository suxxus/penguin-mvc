const { setupBenv } = require('./test-helper');
require('./scripts/penguin-controller_spec.js');
require('./scripts/penguin-view_spec.js');
require('./scripts/penguin-model_spec.js');

setupBenv();
