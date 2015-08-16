var m = require('mithril'),
    Model = require('../utilities/model.js');

var Todo = module.exports = function (data) {
    for (var prop in Model) this[prop] = Model[prop];

    this.attributes = {
        description: m.prop(data.description),
        is_completed: m.prop(data.is_completed),
        id: m.prop(data.id)
    };
};