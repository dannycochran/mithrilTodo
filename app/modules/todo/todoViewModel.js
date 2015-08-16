var m = require('mithril'),
    Model = require('../utilities/model.js');

var Todo = module.exports = function () {
    for (var prop in Model) this[prop] = Model[prop];

    this.noSync = true;
    this.attributes = {
        is_editing: m.prop(false)
    };
};