var m = require('mithril'),
    ViewModel = require('./todoViewModel.js');

module.exports = {
    controller: function (data) {
        return {
            model: data.model,
            viewModel: new ViewModel()
        }
    },
    view: function (ctrl) {
        var model = ctrl.model,
            viewModel = ctrl.viewModel;

        function classList () {
            var classNames = (model.get('is_completed') ? 'completed' : '') +
                             (viewModel.get('is_editing') ? ' editing' : '');
            return {className: classNames};
        }

        function toggle () {
            return {
                type: 'checkbox',
                checked: model.get('is_completed') ? true : null,
                onchange: function () { model.set('is_completed', !model.get('is_completed')); }
            };
        }

        function description () {
            return {
                innerHTML: model.get('description'),
                onchange: function (e) {
                    model.set('description', e.currentTarget.innerHTML);
                },
                ondblclick: function (e) {
                    viewModel.set('is_editing', true);
                }
            }
        }

        function inputDescription () {
            return {
                onkeyup: function (e) {
                    var preventSync = true;
                    if (e.keyCode === 13 || e.keyCode === 27) {
                        if (e.keyCode === 13) preventSync = false;
                        viewModel.set('is_editing', false);
                    }
                    model.set('description', e.currentTarget.value, preventSync);
                },
                config: function (el) {
                    if (viewModel.get('is_editing')) {
                        el.focus();
                        el.selectionStart = el.value.length;
                    }
                },
                onblur: function (e) {
                    model.set('description', e.currentTarget.value);
                    viewModel.set('is_editing', false);
                },
                value: model.get('description')
            };
        }

        function destroy () {
            return {
                onclick: function (e) { model.destroy(); }
            }
        }

        return m('li', classList(), [
            m('div.view', [
                m('input.toggle', toggle()),
                m('label', description()),
                m('button.destroy', destroy())
            ]),
            m('input.edit', inputDescription())
        ]);
    }
};