define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
        id=1,
        xml,
        parsed = [], 
        album_title = "",
        title = "",
        url_s = "",
        url_o = "",
        url_sq = "",
        
        Photo = Backbone.Model.extend({  
 
        }),

        
        PhotoCollection = Backbone.Collection.extend({

            model: Photo,
            
            url: function(){
                    var link = 'http://api.flickr.com/services/rest/?';
                    link += '&method=flickr.photosets.getPhotos';
                    link += '&api_key=761fa2a4f0ff982d9f4dd692cd322f1f&user_id=103885491@N02';
                    link += "&extras=url_sq,url_t,url_s,url_m,url_o";
                    link += "&photoset_id="+this.photoset_id;
                    
                    return link;
                 },
            
            //This is used so I can test on a browser. On a device, use the direct link
           
           /*
            url: function(){
                    return "/school-proxy.php?type=photos&photoset_id="+this.photoset_id;
                 },*/
            
            initialize: function (models, options) {
                 parsed = [];
                 this.photoset_id = options.photoset_id;
                //this.players = new PlayerCollection();
                //this.players.url = this.url + "/" + this.team_id;
            },
        
            parse: function (data) {
                xml = data;
                album_title = "";              

                album_title = $(xml).find('photoset').attr('title');
                
                            
                $(xml).find('photo').each(function (index) {

                    id = $(this).attr('id'); 
                    title = $(this).attr('title');       
                    url_s = $(this).attr('url_s');
                    url_o = $(this).attr('url_o');
                    url_sq = $(this).attr('url_sq');
  
                    parsed.push({id:id, album_title:album_title, title: title, 
                                 url_s:url_s, url_o:url_o, url_sq:url_sq});
                
                });

                return parsed;
            },
                    

            fetch: function (options) {
                options = options || {};
                options.dataType = "xml";
                return Backbone.Collection.prototype.fetch.call(this, options);
            }

        });


    return {
        Photo: Photo,
        PhotoCollection: PhotoCollection
    };

});