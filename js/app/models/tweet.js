define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),

        Tweet = Backbone.Model.extend(),

        TweetCollection = Backbone.Collection.extend({
            
            model: Tweet,
           
            url: function(){
                    return "/twitter/"+twitter_handle;
                 },
        });

    return {
        Tweet: Tweet,
        TweetCollection: TweetCollection
    };

});