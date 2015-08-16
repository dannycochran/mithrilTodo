var m = require('mithril'),
    Router = require('../router/routerManager.js');

module.exports = {
    controller: function (ctrl) { return ctrl; },
    view: function (ctrl) {
        var incomplete = ctrl.models.length - ctrl.completed().length,
            filter = m.route.param('filter') || '';

        function href (name) {
            return {
                config: m.route,
                href: '/' + name,
                class: filter === name ? 'selected' : '',
                innerHTML: name === '' ? 'All' : name[0].toUpperCase() + name.split('').slice(1, name.length).join('')
            };
        }

        function clearCompleted () {
            return ctrl.completed().length > 0 ?
                m('button#clear-completed', {
                    onclick: function () { ctrl.completed().forEach(todo => todo.destroy())},
                    innerHTML: 'clear completed'
                }) : '';
        }

        return m('footer#footer', [
            m('span#todo-count', [m('strong', incomplete), ' item' + (incomplete !== 1 ? 's' : '') + ' left']),
            m('ul#filters', [
                m('li', [m('a', href(''))]),
                m('li', [m('a', href('active'))]),
                m('li', [m('a', href('completed'))]),
            ]),
            clearCompleted()
        ]);
    }
};