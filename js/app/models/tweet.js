define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        Tweet = Backbone.Model.extend(),

        TweetCollection = Backbone.Collection.extend({
            
            model: Tweet,
           
            url: function(){
                    return "/twitter-proxy.php?screen_name=CCAthlone";
                 },
        });

    return {
        Tweet: Tweet,
        TweetCollection: TweetCollection
    };

});