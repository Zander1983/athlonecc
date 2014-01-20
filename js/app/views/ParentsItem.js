define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        UsefulFuncs         = require('app/utils/useful_func'),
        tpl                 = require('text!tpl/ParentsItem.html'),
        side_nav            = require('text!tpl/SideNav.html'),
        UsefulFuncs         = require('app/utils/useful_func'),
        template_pdf = _.template(tpl_pdf),
        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.removeDescriptionStyles();
            this.render();
        },
        
        events: {
             "click #pdf-link"   : 'pdfClicked',
        },
        
        pdfClicked: function(e){
    
            var href = $(e.currentTarget).attr('rel');
            
            //Android ONLY - ios can you inAppBrowser
            navigator.app.loadUrl(href, { openExternal:true });
            
        },
                
        removeDescriptionStyles: function(){
      
            var description = UsefulFuncs.removeStyles(this.model.attributes.description);
            
            if(description.length>0){
                this.model.set({description: description});
            }     
        },

        render: function () {
          
            this.$el.html(template({side_nav:side_nav, model:this.model.attributes}));               
            return this;
        },
        


    });

});