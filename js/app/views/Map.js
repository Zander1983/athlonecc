define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Map.html'),
        side_nav                = require('text!tpl/SideNav.html'),
        side_template = _.template(side_nav),
        template = _.template(tpl),
        that;    
 
 
     function clickAway(event) {
    
        that.body.find('.main-content').css('min-height', '1150px'); 
        document.removeEventListener('backbutton', clickAway);
       
    }


    return Backbone.View.extend({

        initialize: function (options) {
            this.body = options.body;
            that = this;
            this.render();
            
            document.addEventListener('backbutton', clickAway);
        },
                
                
                
  
                
        initMap: function () {
            
            require(['async!https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false'], function(){
                
                    console.log('in async map');
                    
                    that.myLatlng = new google.maps.LatLng(53.424162,-7.920671);
                    
                    that.myLatlng = new google.maps.LatLng(53.424162,-7.920671);


                    that.mapOptions = {
                       center: that.myLatlng,
                       zoom: 12,
                       mapTypeId: google.maps.MapTypeId.ROADMAP
                   };


                   that.map = new google.maps.Map(that.$el.find('#map-canvas')[0],
                                                 that.mapOptions);

                    that.marker = new google.maps.Marker({
                       position: that.myLatlng,
                       map: that.map,
                       title: 'Christians Brothers College Cork'
                   });

            });

        },
          
        
        events: {
             //"click input": "notificationClicked",
             "click .map-menu-button"   : "menuClicked",
        },
        
        menuClicked: function(){
    
            console.log('in menuClicked and setting css, main content is ');
            console.log(that.body.find('.main-content'));
            that.body.find('.main-content').css('min-height', '1150px');
    
        },


        render: function () {
    
            this.$el.html(template({side_nav:side_template({message_count:this.options.message_count})}));

            this.initMap();      
           
        },


    });

});