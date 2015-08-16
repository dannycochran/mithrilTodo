// should probably just import the actual backbone collection here

var m = require('mithril');

module.exports = {
    extend: function (props) {
        for (var prop in props) this[prop] = props[prop];
        return this;
    },

    hydrate: function () {
        if (!this.hydrated) {
            this.hydrated = this.fetch().then(function (models) {
                this.models = models;
                models.forEach(model => model.collection = this);
                return this;
            }.bind(this));
        }
        return this.hydrated;
    },

    fetch: function () {
        return m.request({method: 'GET', url: this.url(), type: this.model});
    },

    url: function () {
        return '/api/' + this.name;
    },

    create: function (attributes) {
        return m.request({method: 'POST', url: this.url(), data: attributes}).then(function (response) {
            var model = new this.model(response);
            model.collection = this;
            this.models.push(model);
        }.bind(this));
    }
}