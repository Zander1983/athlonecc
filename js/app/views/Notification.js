define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        device_model        = require('app/models/device'),
        tpl                 = require('text!tpl/Notification.html'),
        side_nav            = require('text!tpl/SideNav.html'),
        template            = _.template(tpl),
        that,
        notification;

    return Backbone.View.extend({

        initialize: function (options) {
            
            
            this.storage = options.storage;
            this.device = this.model;
            
            that = this;
            
            this.render();
        },

        render: function (options) {
         
            if(this.model.has('project_title')){
                notification = "yes";
            }
            else{
                this.model.unset('id');
                notification = "no";
            }
         
            this.$el.html(template({side_nav:side_nav, notification:notification
                                    }));
            return this;
        },
        
                
        events: {
             //"click input": "notificationClicked",
             "change #notification"   : "switchClicked",
        },
 
                
        switchClicked:function (event) {   

            event.preventDefault();    
            
            var checked = $(event.currentTarget).is(":checked");
            
            if(checked===true){

                    //that.storage.setItem('notification', 'yes');
                    
                    //var device = new device_model.Device();
           
                    /*
                     * for the phone
                     */
                    
                    var devicePlatform = device.platform;
            
                    console.log('devicePlatform is ');
                    console.log(devicePlatform);
            
            
                    var pushNotification = window.plugins.pushNotification;
                    pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"190898683137","ecb":"app.onNotificationGCM"});
               
                    /*
                     * for testing on chrome
                     */
                    
                    /*
                    require(["app/models/device"], function (model) {
                        
                            //var device = new model.Device();
                            
                            var deviceDetails = [];

                            deviceDetails.reg_id = 'dhafse8f9s8fsfhakfakhgkasghkaerf';
                            deviceDetails.project_title = 'cbccork';

                            that.model.save(deviceDetails, 
                                {api: true,

                                success: function (data) {
                                    that.storage.setItem('cbccork_device_id', data.id);
                                },
                                error: function(){                                
                                    console.log('filed to save reg id');
                                }
                            });
                            
                            //alert('registration id = '+e.regid);
                    });*/

            }
            else{
                //if(that.notification!=="no"){
                    //console.log('saving no..');
                    //that.storage.setItem('notification', 'no');
                    
                    var device_id = that.storage.getItem('cbccork_device_id');
                    if(typeof(device_id)==='undefined' || device_id===null){
                        //theres a problem, this should be set
                        alert('There was a problem turning off notifications, please contant the developer');
                    }
                    else{
                        //var device = new device_model.Device({id:device_id});
                        console.log('destroying....');
                        that.device.id = device_id;
                        that.device.destroy({api:true,
                                        success: function(model, response) {
                                                that.storage.removeItem('cbccork_device_id');
                                                that.device.unset('id');
                                                alert('successfully destroyed');
                                            },
                                        error: function(){
                                                alert('could not setroy');
                                            }
                                        });
                    }
                
            }
         
        },

    });

});