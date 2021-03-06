define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/NotificationPlay.html'),
        side_nav            = require('text!tpl/SideNav.html'),
        side_template = _.template(side_nav),
        template            = _.template(tpl),
        that;

    return Backbone.View.extend({

        initialize: function (options) {
            
            this.storage = window.localStorage;
           // this.deviceModel = this.model;
            
            that = this;
            
            this.render();
        },

        render: function (options) {
         
            console.log('before the template');
            this.$el.html(template({side_nav:side_template({message_count:this.options.message_count})
                                    }));
            return this;
        },
        
                
        events: {
             //"click input": "notificationClicked",
           //  "change #myonoffswitch"   : "switchClicked",
        },
 
                
        switchClicked:function (event) {  
    
            alert('in switchClicked');

            event.preventDefault();    
            
            var checked = $(event.currentTarget).is(":checked");
            
            if(checked===true){
                
                    alert('in checked is true');

                    var notificationDetails = [];

                    notificationDetails.notification = 1;

                    this.model.save(notificationDetails, 
                                    {
                                    api:true,
                                    update_notification:true,
                                    headers: {device_id:this.model.id,
                                    api_key:that.storage.getItem(project_title+"_api_key")},
                                    success: function() {
                                        },
                                        error:   function(model, xhr, options){
                                           //alert('Error setting to 1')
                                           //console.log(xhr.responseText);
                                        },
                                    });
            

            }
            else{
                    

                    if(typeof(this.model.id)==='undefined' || this.model.id===null){
                        //theres a problem, this should be set
                        alert('There was a problem turning off notifications, please contact the developer');
                    }
                    else{
                        
                        var notificationDetails = [];

                        notificationDetails.notification = 0;
                        
                        this.model.save(notificationDetails, 
                                        {
                                        api:true,
                                        update_notification:true,
                                        headers: {device_id:this.model.id,
                                        api_key:that.storage.getItem(project_title+"_api_key")},
                                        success: function(data) {
                                                
                                            },
                                        error:   function(model, xhr, options){
                                           //alert('Error setting to 0')
                                           //console.log(xhr.responseText);
                                        },
                                        });
                
                    }
                
            }
         
        },

    });

});