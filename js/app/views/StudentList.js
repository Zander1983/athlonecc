define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/StudentList.html'),
        side_nav            = require('text!tpl/SideNav.html'),
        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.render();
            this.collection.on("reset", this.render, this);
        },

        render: function () {
            this.$el.html(template({side_nav:side_nav, student:this.collection.toJSON()}));
            return this;
        },
          


    });

});