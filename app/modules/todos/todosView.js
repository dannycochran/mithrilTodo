var m = require('mithril'),
    Todo = require('../todo/todoView.js');

module.exports = {
    controller: function (ctrl) { return ctrl; },
    view: function (ctrl) {
        var filter = m.route.param('filter') || '';

        function toggleAll () {
            var allSelected = ctrl.models.length === ctrl.numComplete();
            return {
                type: 'checkbox',
                onclick: function () {
                    ctrl.models.forEach(model => model.set('is_completed', !allSelected));
                },
                checked: allSelected
            }
        }
        return m('section#main', [
            m('input#toggle-all', toggleAll()),
            m('ul#todo-list', ctrl.models
                .filter(todo =>
                    filter === '' ? true : filter === 'active' ? !todo.get('is_completed') : todo.get('is_completed')
                )
                .map(todo => m.component(Todo, {model: todo, key: todo.get('id')}))
            )
        ]);
    }
};