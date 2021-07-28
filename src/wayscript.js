const wayScriptClient = require('./utils.js');

const newWayScriptClient = new wayScriptClient();
function sum(a, b) {
    return a + b;
  }
module.exports = {sum, newWayScriptClient};