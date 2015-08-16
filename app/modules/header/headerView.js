var m = require('mithril'),
    Todo = require('../todo/todoModel.js'),
    Todos = require('../todos/todosManager.js');

module.exports = {
    view: function () {
        function newTodo () {
            return {
                placeholder: 'What needs to be done?',
                onkeyup: function (e) {
                    if (e.keyCode === 13 || e.keyCode === 27) { // enter
                        if (e.keyCode === 13) Todos.create({
                            description: e.currentTarget.value,
                            is_completed: false
                        });
                        e.currentTarget.value = '';
                    }
                },
            };
        }

        return m('header#header', [
            m('h1', 'todos'),
            m('input#new-todo', newTodo())
        ]);
    }
}