define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        UsefulFuncs         = require('app/utils/useful_func'),
        tpl                 = require('text!tpl/ParentsItem.html'),
        side_nav            = require('text!tpl/SideNav.html'),
        UsefulFuncs         = require('app/utils/useful_func'),
        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.removeDescriptionStyles();
            this.parseDescriptionPdfs();
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
                
                
        parseDescriptionPdfs: function(){
    
            var description = this.model.get('description');        
            var href;
            //if any pdf's, change the link
            if($(description).find('a').length>0){
                $(description).find('a').each(function(i, obj){
                    href = "";
                    href = $(obj).attr('href');
                    if(href.substr(href.length - 4)===".pdf" || href.substr(href.length - 4)===".PDF"){
                        //so its a pdf, replace link (THIS ONLY WORKS WITH ANDROID)
                        description = description.replace($(obj)[0].outerHTML, '<div id="pdf-link" rel="'+href+'" >'+$(obj).text()+'</div>');

                    }
                });
            }
            else{
                href = "";
            }
            
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