define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
        id=1,
        xml,
        parsed = [], 
        title = "", 
        description = "", 
        pubDate = "", 
        src="",
        other_src="",
        href,
        NewsFlash = Backbone.Model.extend({  

        }),

        
        NewsFlashCollection = Backbone.Collection.extend({

            model: NewsFlash,
            url: 'http://www.athlonecc.ie/index.php?option=com_ninjarsssyndicator&feed_id=15&format=raw',
            
            //This is used so I can test on a browser. On a device, use the direct link
         
            /*
            url: function(){
                    return "/school-proxy.php?type=newsflash";
                 },
            */
        
            parse: function (data) {

                xml = data;

              
                $(xml).find('item').each(function (index) {
           
                    title = $(this).find('title').text();
                    
                    description = $(this).find('description').text();
                    
                    pubDate = $(this).find('pubDate').text();
                    
                    pubDate = pubDate.substring(0, pubDate.length-12);


                    $(description).find('img').each(function(i, obj){

                            other_src = $(obj).attr('src');
                            if(other_src.indexOf('http') === -1){
                                //therefore its a relative path
                                description = description.replace(other_src,"http://athlonecc.ie"+other_src);                         
                            }
                       
                    });
                    
       
                    parsed.push({id:id, title: title,
                                description:description, pubDate:pubDate});
                    title, description, pubDate = "";
                   id++;
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
        NewsFlash: NewsFlash,
        NewsFlashCollection: NewsFlashCollection
    };

});