define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/PhotoList.html'),
        side_nav                = require('text!tpl/SideNav.html'),
        template = _.template(tpl),
        album_title;


    return Backbone.View.extend({

        initialize: function (options) {
                
            this.render();
        },

        render: function (options) {
            album_title = this.collection.first().get('album_title');
            
           // console.log('in view and album_title is ');
          //  console.log(album_title);
            
            this.$el.html(template({side_nav:side_nav, photo:this.collection.toJSON(), album_title:album_title}));
           
        },

    });

});