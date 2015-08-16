var m = require('mithril');

module.exports = function () {
    return {
        initialize: function (routes) {
            m.route.mode = 'hash';
            m.route(document.body, '/', routes);
        }
    }
}