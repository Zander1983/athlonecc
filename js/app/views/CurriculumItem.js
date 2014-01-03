define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        UsefulFuncs         = require('app/utils/useful_func'),
        tpl                 = require('text!tpl/NewsItem.html'),
        side_nav                = require('text!tpl/SideNav.html'),
        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.removeDescriptionStyles();
            this.render();     
        },

        render: function () {
            this.$el.html(template({side_nav:side_nav, model:this.model.attributes}));
            return this;
        },
   
        removeDescriptionStyles: function(){
      
            var description = UsefulFuncs.removeStyles(this.model.attributes.description);
            
            if(description.length>0){
                this.model.set({description: description});
            }
            
        },

    });

});