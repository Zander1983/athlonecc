define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
        id=1,
        xml,
        parsed_albums = [], 
        num_photos,
        id,
        title,
        
        
        Album = Backbone.Model.extend({  

 
        }),

        
        AlbumCollection = Backbone.Collection.extend({

            model: Album,
            
            
            url: function(){
                
                    var link = "http://api.flickr.com/services/rest/?";
                    link += "&method=flickr.photosets.getList";
                    link += "&api_key=761fa2a4f0ff982d9f4dd692cd322f1f";
                    link += "&user_id=103885491@N02";
                    
                    return link;
            },
            
            /*
            url: function(){
                    return "/school-proxy.php?type=albums";
                 },*/
            
        
            parse: function (data) {
                xml = data;

              
                $(xml).find('photoset').each(function (index) {
      
                    title = $(this).find('title').text();
                    id = $(this).attr('id');                    
                    num_photos = $(this).attr('photos');
         
                    parsed_albums.push({id:id, title: title, num_photos:num_photos});
                   id++;
                });

                return parsed_albums;
            },
                    

            fetch: function (options) {
                options = options || {};
                options.dataType = "xml";
                return Backbone.Collection.prototype.fetch.call(this, options);
            }

        });


    return {
        Album: Album,
        AlbumCollection: AlbumCollection
    };

});