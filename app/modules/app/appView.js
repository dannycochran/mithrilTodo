var m = require('mithril'),
    Header = require('../header/headerView.js'),
    Todos = require('../todos/todosManager.js'),
    Main = require('../todos/todosView.js'),
    Router = require('../router/routerManager.js'),
    Footer = require('../footer/footerView.js');

require('./app.scss');

module.exports = {
    initialize: function () {
        Todos.hydrate().then(function () {
            Router.initialize({
                '/': this,
                '/:filter': this
            });
        }.bind(this));
    },
    controller: function () {
        m.redraw.strategy('none');
        return Todos;
    },
    view: function (ctrl) {
        return m('section#todoapp', [
            m.component(Header),
            ctrl.models.length ? m.component(Main, ctrl) : '',
            ctrl.models.length ? m.component(Footer, ctrl) : ''
        ]);
    }
};