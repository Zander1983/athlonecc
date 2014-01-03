define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/ParentsList.html'),
        side_nav                = require('text!tpl/SideNav.html'),
        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.render();
            this.collection.on("reset", this.render, this);
        },

        render: function () {
            this.$el.html(template({side_nav:side_nav, parents:this.collection.toJSON()}));
            return this;
        },
          
    
        /*
        loadMore: function(){
            var ul = $('#parents-list');
            var id = ul.find('li:last-child').data("id");
            var li="";
             _.every(this.collection.toJSON(), function(item) {
                    if(item.id>id){
                        li += '<li class="topcoat-list__item" data-id="'+item.id+'">';
                        li += '<a href="#parents-item/<%= item.id %>">';
                        li += '<img height="30" width="30" src="'+item.src+'">';
                        li += '<p>'+item.title+'</p>';
                        li += '<p>'+item.pubDate+'</p>';
                        li += '<span class="chevron"></span>';
                        li += '</a>';
                        li += '</li>';
                    }  

                    if(item.id>(id+10)){
                        console.log('in loadMore if');
                        return false;
                    }
                    return true;
            });
            ul.append(li);
        }*/
            /*    
        events: {
             "click .player": "jerseyClicked",
             "click ul#predict-player-list a": "playerSelected",
             "submit .team-predict-form"   : "beforeSave",
             "click .overlay"   : "overlayClicked",
             "click .new-list": "newList",
        },*/

    });

});