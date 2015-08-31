var common = require('./common.json');

try {
    var local = require('./local.json');
    Object.keys(local).forEach(function (key) {
        common[key] = local[key];
    })
} catch (e) {
}

module.exports = common;
