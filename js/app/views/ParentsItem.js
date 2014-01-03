define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl_pdf             = require('text!tpl/ParentsPDFItem.html'),
        tpl                 = require('text!tpl/ParentsItem.html'),
        side_nav            = require('text!tpl/SideNav.html'),
        UsefulFuncs         = require('app/utils/useful_func'),
        template_pdf = _.template(tpl_pdf),
        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
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

        render: function () {
            if(this.model.get('pdf')===true){
                this.$el.html(template_pdf({side_nav:side_nav, model:this.model.attributes}));                
            }
            else{
                this.$el.html(template({side_nav:side_nav, model:this.model.attributes}));               
            }

            return this;
        },
        


    });

});