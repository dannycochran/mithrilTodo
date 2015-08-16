var m = require('mithril'),
    Todo = require('./../todo/todoModel.js'),
    Collection = require('../utilities/collection.js');

module.exports = function () {
    return Collection.extend({
        name: 'todos',
        model: Todo,
        completed: function () { return this.models.filter(model => model.get('is_completed')); }
    });
};