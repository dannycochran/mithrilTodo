// should probably just import the actual backbone model here

var m = require('mithril');

module.exports = {
    url: function () {
        return this.collection.url() + '/' + this.index();
    },
    set: function (prop, value, preventSync) {
        this.attributes[prop](value);
        if (!this.noSync && !preventSync) this.save();
    },
    get: function (prop) {
        return this.attributes[prop]();
    },
    getAllAttributes: function () {
        var attributes = {};
        for (var attr in this.attributes) attributes[attr] = this.attributes[attr]();
        return attributes;
    },
    destroy: function () {
        m.request({method: 'DELETE', url: this.url()});;
        this.collection.models.splice(this.index(), 1);
        return this;
    },
    save: function () {
        return m.request({method: 'PUT', url: this.url(), data: this.getAllAttributes()});
    },
    index: function () {
        return this.collection ? this.collection.models.indexOf(this) : null;
    }
}